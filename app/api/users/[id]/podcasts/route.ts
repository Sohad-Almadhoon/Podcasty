import { NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        const { data, error } = await supabase
            .from("podcasts")
            .select("id, podcast_name, play_count, image_url, description, likes(podcast_id)")
            .eq("user_id", id);

        if (error) {
            throw new Error(error.message);
        }

        return NextResponse.json(data || []);
    } catch (err) {
        return NextResponse.json({ error: (err as Error).message }, { status: 500 });
    }
}
