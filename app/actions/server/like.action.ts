"use server";
import { getSupabaseAuth } from "@/app/lib/supabase";

export const addLike = async (id: string, user_id: string) => {
    try {
        const supabase = await getSupabaseAuth();

        const { data: existingLike, error: likeError } = await supabase
            .from("likes")
            .select("id")
            .eq("podcast_id", id)
            .eq("user_id", user_id)
            .single();

        if (likeError && likeError.code !== "PGRST116") {
            console.error("Error checking like:", likeError);
        }

        if (existingLike) {
            const { error: deleteError } = await supabase
                .from("likes")
                .delete()
                .eq("id", existingLike.id);

            if (deleteError) {
                console.error("Error removing like:", deleteError);
            }

        } else {
            const { error: insertError } = await supabase
                .from("likes")
                .insert([{ podcast_id: id, user_id }]);

            if (insertError) {
                console.error("Error inserting like:", insertError);
            }

        }
    } catch (error) {
        console.error("Unexpected error:", error);
    }
}



