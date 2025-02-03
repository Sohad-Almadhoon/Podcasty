import openai from '@/lib/openai';
import supabase from '@/lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';


export async function POST(req : NextApiRequest, res:NextApiResponse) {
    if (req.method === 'POST') {
        const { podcast_name, description } = req.body;

        try {
            const image = await openai.images.generate({
                model: "dall-e-3",
                prompt: description,
                n: 1,
                size: "1024x1024",
            });
            const audio = await openai.audio.speech.create({
                model: "tts-1",
                voice: "alloy",
                input: "Today is a wonderful day to build something people love!",
            });
            const { data: audioData, error: audioError } = await supabase
                .storage
                .from('podcasts')
                .upload(`audio/${Date.now()}.mp3`, Buffer.from(audio), {
                    contentType: 'audio/mpeg',
                });

            if (audioError) throw audioError;

            const { data: imageData, error: imageError } = await supabase
                .storage
                .from('podcasts')
                .upload(`images/${Date.now()}.jpg`, Buffer.from(image), {
                    contentType: 'image/jpeg',
                });

            if (imageError) throw imageError;

            // Get public URLs for the uploaded files
            const audioUrl = supabase.storage.from('podcasts').getPublicUrl(audioData.path).data.publicUrl;
            const imageUrl = supabase.storage.from('podcasts').getPublicUrl(imageData.path).data.publicUrl;

            // Save podcast data in database
            const { data: podcast, error: dbError } = await supabase
                .from('podcasts')
                .insert([{ podcast_name, description, audio_url: audioUrl, image_url: imageUrl }]);

            if (dbError) throw dbError;

            res.status(200).json({ message: 'Podcast uploaded successfully', podcast });
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
