import supabase from '@/app/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { podcast_name, description, imageUrl, audioUrl, ai_voice, user_id } = await req.json();

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
        console.log(podcastData);
        if (podcastError) throw new Error('Failed to insert podcast data into the table!' + podcastError.message);

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
