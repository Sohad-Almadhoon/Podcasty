import supabase from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { podcast_name, description, imageUrl, audioUrl } = await req.json();
        const user_id = "11554248-2b35-45e3-a63e-b0479f8a7e64"; 

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
                },
            ]);

        if (podcastError) throw new Error('Failed to insert podcast data into the table!');

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
