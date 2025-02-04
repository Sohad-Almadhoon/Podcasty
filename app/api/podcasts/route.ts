import openai from '@/lib/openai';
import supabase from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const user = await supabase.auth.getUser();
    const user_id = user.data.user?.id;
    const { podcast_name, description } = await req.json();  // Ensure you're extracting the request body correctly

    try {
        // Generate Audio from OpenAI
        const audioResponse = await openai.audio.speech.create({
            model: "tts-1",
            voice: "alloy",
            input: description, // Use the actual description instead of static text
        });

        if (!audioResponse) {
            throw new Error("Failed to generate audio");
        }

        const audioBuffer = Buffer.from(await audioResponse.arrayBuffer());

        // Upload Audio to Supabase Storage
        const audioName = `audio/${Date.now()}.mp3`;  // Unique name for the audio file
        const { data: audioData, error: audioError } = await supabase
            .storage
            .from('podcasts')  // Make sure this matches the name of your bucket
            .upload(audioName, audioBuffer, {
                contentType: 'audio/mpeg',  // Set the appropriate content type
            });

        if (audioError) throw audioError;

        // Get public URL for the uploaded audio
        const audioUrl = supabase.storage.from('podcasts').getPublicUrl(audioData.path).data.publicUrl;

        // Return the public URL of the uploaded audio file
        return new NextResponse(
            JSON.stringify({ audioUrl }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: error instanceof Error ? error.message : 'An unknown error occurred' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }

}
