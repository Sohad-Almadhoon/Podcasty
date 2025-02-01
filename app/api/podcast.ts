import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { z } from 'zod';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

const schema = z.object({
    description: z.string().min(10, "Description must be at least 10 characters"),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        // Validate input
        const { description } = schema.parse(req.body);

        // Generate image
        const imageResponse = await openai.images.generate({
            prompt: description,
            n: 1,
            size: "1024x1024",
        });

        const imageUrl = imageResponse.data[0].url;

        // Generate audio
        const audioResponse = await openai.audio.speech.create({
            model: "tts-1",
            voice: "alloy",
            input: description,
        });

        const audioUrl = audioResponse.url; // Direct link

        return res.status(200).json({ imageUrl, audioUrl });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
