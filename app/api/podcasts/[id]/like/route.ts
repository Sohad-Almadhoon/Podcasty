import supabase from "@/app/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { id: string } }) {
    const { id } = await params;
    const { user_id } = await req.json();

    try {
        const { data: existingLike, error: likeError } = await supabase
            .from("likes")
            .select("id")
            .eq("podcast_id", id)
            .eq("user_id", user_id)
            .single();

        if (likeError && likeError.code !== "PGRST116") {
            console.error("Error checking like:", likeError);
            return NextResponse.json({ success: false, message: "Failed to check existing like." }, { status: 500 });
        }

        if (existingLike) {
            const { error: deleteError } = await supabase
                .from("likes")
                .delete()
                .eq("id", existingLike.id);

            if (deleteError) {
                console.error("Error removing like:", deleteError);
                return NextResponse.json({ success: false, message: "Failed to remove like." }, { status: 500 });
            }

            return NextResponse.json({ success: true, message: "Like removed successfully." }, { status: 200 });
        } else {
            const { error: insertError } = await supabase
                .from("likes")
                .insert([{ podcast_id: id, user_id }]);

            if (insertError) {
                console.error("Error inserting like:", insertError);
                return NextResponse.json({ success: false, message: "Failed to insert like." }, { status: 500 });
            }

            return NextResponse.json({ success: true, message: "Like added successfully." }, { status: 201 });
        }
    } catch (error) {
        console.error("Unexpected error:", error);
        return NextResponse.json({ success: false, message: "An unexpected error occurred." }, { status: 500 });
    }
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");

    try {
        // Get the total like count
        const { count, error: countError } = await supabase
            .from("likes")
            .select("*", { count: "exact", head: true })
            .eq("podcast_id", id);

        if (countError) {
            console.error("Error fetching like count:", countError);
            return NextResponse.json({ success: false, message: "Failed to fetch likes." }, { status: 500 });
        }

        let userLiked = false;

        // If user_id is provided, check if the user has liked the podcast
        if (user_id) {
            const { data: existingLike, error: likeError } = await supabase
                .from("likes")
                .select("id")
                .eq("podcast_id", id)
                .eq("user_id", user_id)
                .single();

            if (likeError && likeError.code !== "PGRST116") {
                console.error("Error checking user like:", likeError);
                return NextResponse.json({ success: false, message: "Failed to check user like." }, { status: 500 });
            }

            userLiked = !!existingLike;
        }

        return NextResponse.json({ success: true, data: { likeCount: count, userLiked } }, { status: 200 });

    } catch (error) {
        console.error("Unexpected error:", error);
        return NextResponse.json({ success: false, message: "An unexpected error occurred." }, { status: 500 });
    }
}

