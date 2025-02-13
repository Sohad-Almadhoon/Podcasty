import supabase from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const { id } = params; 
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId"); 

    try {
        let query;
        if (userId) {
            query = supabase
                .from("podcasts")
                .select(`
      id,
      podcast_name,
      description,
      image_url,
      play_count,
      ai_voice,
      user_id,
     users:user_id (username),   
      likes(podcast_id) 
    `)
                .eq("user_id", userId)
                .neq("id", id);
        } else {
            query = supabase
                .from("podcasts")
                .select(`
      id,
      podcast_name,
      description,
      image_url,
      play_count,
      ai_voice,
      user_id,
     users:user_id (username , avatar_url),   
      likes(podcast_id)
    `)
                .eq("id", id)
                .single();
        }


        const { data, error } = await query;

        if (error) {
            throw error;
        }

        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        console.error("Error fetching podcast details:", error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const { id } = params;

    try {
        const { error } = await supabase
            .from('podcasts')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return NextResponse.json({ message: 'Podcast deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}