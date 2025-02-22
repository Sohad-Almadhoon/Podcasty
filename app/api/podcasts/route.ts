import { getSupabaseAuth } from "@/app/lib/supabase";
import { Podcast } from "@/app/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const supabase = await getSupabaseAuth();
        const { searchParams } = new URL(req.url);
        const query = searchParams.get("query")?.trim() || "";

        const { data, error } = await supabase.from("podcasts").select(`
            id,
            podcast_name,
            description,
            image_url,
            audio_url,
            play_count,
            ai_voice,
            user_id,    
            users:user_id (username, avatar_url),
            likes(podcast_id)
        `);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json<Podcast[]>(data);
    } catch (error) {
        console.error("Error fetching podcasts:", error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
