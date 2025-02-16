import supabase from "@/app/lib/supabase";
import { NextResponse } from "next/server";


export async function POST(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        // Fetch current play count
        const { data, error } = await supabase
            .from("podcasts")
            .select("play_count")
            .eq("id", id)
            .single();

        if (error || !data) {
            return NextResponse.json({ success: false, message: "Podcast not found" }, { status: 404 });
        }

        const { error: updateError } = await supabase
            .from("podcasts")
            .update({ play_count: data.play_count + 1 })
            .eq("id", id);

        if (updateError) {
            throw updateError;
        }

        return NextResponse.json({ success: true, new_play_count: data.play_count + 1 });
    } catch (error) {
        console.error("Error updating play count:", error);
        return NextResponse.json({ success: false, message: "Failed to update play count" }, { status: 500 });
    }
}
