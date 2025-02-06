import openai from '@/lib/openai';
import supabase from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const user = await supabase.auth.getUser();
    const user_id = user.data.user?.id;
    const { podcast_name, description } = await req.json();  

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
            voice: "shimmer",
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

        if (audioError) throw new Error('Failed To Upload audio to Supabase!');

        const audioUrl = supabase.storage.from('podcasts').getPublicUrl(audioData.path).data.publicUrl;


        return new NextResponse(
            JSON.stringify({ audioUrl, imageUrl }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: error } ),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }

}
