import openai from '@/lib/openai';
import supabase from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { podcast_name, description } = await req.json();
    const { data: user, error: authError } = await supabase.auth.getUser();
    const user_id = "11554248-2b35-45e3-a63e-b0479f8a7e64";
    console.log(user_id);
    // if (authError || !user_id) {
    //     return new NextResponse(
    //         JSON.stringify({ message: 'User not authenticated' }),
    //         { status: 401, headers: { 'Content-Type': 'application/json' } }
    //     );
    // }
    try {
        // Generate Image 
        const imageResponse = await openai.images.generate(
            {
                model: 'dall-e-3',
                prompt: description,
                n: 1,
            }
        );
        const imageUrl = imageResponse.data[0].url;
        //Generate Audio
        const audioResponse = await openai.audio.speech.create({
            model: "tts-1",
            voice: 'coral',
            input: description,
        });

        const audioBuffer = Buffer.from(await audioResponse.arrayBuffer());
        // Upload Audio to Supabase Storage
        const audioName = `audio/${Date.now()}.mp3`;
        const { data: audioData, error: audioError } = await supabase
            .storage
            .from('podcasts')
            .upload(audioName, audioBuffer, {
                contentType: 'audio/mpeg',
            });

        if (audioError) throw new Error('Failed To Upload audio to Supabase!' + audioError.message);

        const audioUrl = supabase.storage.from('podcasts').getPublicUrl(audioData.path).data.publicUrl;
        console.log(audioUrl);
        const { data: podcastData, error: podcastError } = await supabase
            .from('podcasts')
            .insert([
                {
                    user_id,
                    podcast_name,
                    description,
                    audio_url: audioUrl,
                    image_url: imageUrl,
                },
            ]);

        if (podcastError) throw new Error('Failed to insert podcast data into table!');
        return new NextResponse(
            JSON.stringify(podcastData),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: (error as Error).message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }

}
