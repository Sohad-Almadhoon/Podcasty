import openai from '@/lib/openai';
import supabase from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { ai_prompt  , ai_voice} = await req.json();
        // Generate Image
        const imageResponse = await openai.images.generate({
            model: 'dall-e-3',
            prompt: ai_prompt,
            n: 1,
        });
        const imageUrl = imageResponse.data[0].url;

        // Generate Audio
        const audioResponse = await openai.audio.speech.create({
            model: "tts-1",
            voice: ai_voice.toLowerCase(),
            input: ai_prompt,
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

        if (audioError) throw new Error('Failed to upload audio to Supabase! ' + audioError.message);

        const audioUrl = supabase.storage.from('podcasts').getPublicUrl(audioData.path).data.publicUrl;

        return new NextResponse(
            JSON.stringify({ imageUrl, audioUrl }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: (error as Error).message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
