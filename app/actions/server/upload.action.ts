"use server";
import openai from '@/app/lib/openai';
import { getSupabaseAuth } from '../../lib/supabase';
import { AiVoice } from '../../types';

export async function generatePodcastContent(ai_prompt: string, ai_voice: AiVoice) {
    try {
        const supabase = await getSupabaseAuth();

        // Generate Image
        const imageResponse = await openai.images.generate({
            model: 'dall-e-3',
            prompt: ai_prompt,
            n: 1,
        });

        if (!imageResponse?.data?.[0]?.url) {
            return { success: false, error: "Failed to generate image from OpenAI." };
        }

        const imageUrl = imageResponse.data[0].url;

        // Fetch the image content from the generated URL
        const imageResponseBuffer = await fetch(imageUrl);
        const imageBuffer = Buffer.from(await imageResponseBuffer.arrayBuffer());

        // Upload Image to Supabase Storage
        const imageName = `images/${Date.now()}.png`;
        const { data: imageUploadData, error: imageUploadError } = await supabase.storage
            .from('podcasts')
            .upload(imageName, imageBuffer, {
                contentType: 'image/png',
            });

        if (imageUploadError) {
            return { success: false, error: "Failed to upload image to Supabase: " + imageUploadError.message };
        }

        const storedImageUrl = supabase.storage.from('podcasts').getPublicUrl(imageUploadData.path).data.publicUrl;
        console.log(storedImageUrl, 'storedImageUrl');

        // Generate Audio
        const audioResponse = await openai.audio.speech.create({
            model: "tts-1",
            voice: ai_voice as AiVoice,
            input: ai_prompt,
        });

        const audioBuffer = Buffer.from(new Uint8Array(await audioResponse.arrayBuffer()));

        const audioName = `audio/${Date.now()}.mp3`;
        const { data: audioUploadData, error: audioUploadError } = await supabase.storage
            .from('podcasts')
            .upload(audioName, audioBuffer, {
                contentType: 'audio/mpeg',
            });

        if (audioUploadError) {
            return { success: false, error: "Failed to upload audio to Supabase: " + audioUploadError.message };
        }

        const audioUrl = supabase.storage.from('podcasts').getPublicUrl(audioUploadData.path).data.publicUrl;

        return { success: true, imageUrl: storedImageUrl, audioUrl };

    } catch (error) {
        console.error("Error generating podcast content:", error);
        return { success: false, error: (error as Error).message };
    }
}


export async function createPodcast({
    podcast_name,
    description,
    imageUrl,
    audioUrl,
    ai_voice,
    user_id,
}: {
    podcast_name: string;
    description: string;
    imageUrl: string;
    audioUrl: string;
    ai_voice: string;
    user_id: string;
}) {
    try {
        const supabase = await getSupabaseAuth();

        if (!imageUrl || !audioUrl) {
            return { success: false, error: "Missing generated media data!" };
        }

        const { data: podcastData, error: podcastError } = await supabase
            .from('podcasts')
            .insert([
                {
                    user_id,
                    podcast_name,
                    description,
                    audio_url: audioUrl,
                    image_url: imageUrl,
                    ai_voice
                },
            ])
            .select();

        if (podcastError) {
            return { success: false, error: "Failed to insert podcast data: " + podcastError.message };
        }

        return { success: true, podcast: podcastData };

    } catch (error) {
        console.error("Error creating podcast:", error);
        return { success: false, error: (error as Error).message };
    }
}
