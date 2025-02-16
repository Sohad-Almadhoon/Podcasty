import openai from '@/app/lib/openai';
import supabase from '@/app/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { ai_prompt, ai_voice } = await req.json();
        // Generate Image
        const imageResponse = await openai.images.generate({
            model: 'dall-e-3',
            prompt: ai_prompt,
            n: 1,
        });

        if (!imageResponse.data || imageResponse.data.length === 0) {
            throw new Error("Failed to generate image from OpenAI.");
        }

        const imageUrl = imageResponse.data[0].url;

        // Download image from OpenAI
        if (!imageUrl) {
            throw new Error("Image URL is undefined.");
        }
        const imageRes = await fetch(imageUrl);
        const imageBuffer = await imageRes.arrayBuffer();

        // Upload Image to Supabase
        const imageName = `images/${Date.now()}.png`;
        const { data: imageData, error: imageError } = await supabase.storage
            .from('podcasts')
            .upload(imageName, Buffer.from(imageBuffer), {
                contentType: 'image/png',
            });

        if (imageError) throw new Error('Failed to upload image to Supabase! ' + imageError.message);

        const { data: imagePublicUrlData } = supabase.storage.from('podcasts').getPublicUrl(imageData.path);
        const storedImageUrl = imagePublicUrlData.publicUrl;

        // Generate Audio
        const audioResponse = await openai.audio.speech.create({
            model: "tts-1",
            voice: ai_voice.toLowerCase(),
            input: ai_prompt,
        });

        const audioBuffer = Buffer.from(await audioResponse.arrayBuffer());

        // Upload Audio to Supabase Storage
        const audioName = `audio/${Date.now()}.mp3`;
        const { data: audioData, error: audioError } = await supabase.storage
            .from('podcasts')
            .upload(audioName, audioBuffer, {
                contentType: 'audio/mpeg',
            });

        if (audioError) throw new Error('Failed to upload audio to Supabase! ' + audioError.message);

        // Get public URLs
        const { data: audioPublicUrlData } = supabase.storage.from('podcasts').getPublicUrl(audioData.path);
        const audioUrl = audioPublicUrlData.publicUrl;

        return new NextResponse(
            JSON.stringify({ imageUrl: storedImageUrl, audioUrl }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: (error as Error).message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
