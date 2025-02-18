import openai from '@/app/lib/openai';
import { getSupabaseAuth } from '../lib/supabase';
import { AiVoice } from '../types';


export async function generatePodcastContent(ai_prompt: string, ai_voice: AiVoice) {
    try {
        const supabase = await getSupabaseAuth();
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
            voice: ai_voice,
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

        return { imageUrl: storedImageUrl, audioUrl };

    } catch (error) {
        throw new Error((error as Error).message);
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
            throw new Error('Missing generated media data!');
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
            ]);

        if (podcastError) throw new Error('Failed to insert podcast data into the table!' + podcastError.message);

        return podcastData; 

    } catch (error) {
        throw new Error((error as Error).message); 
    }
}
