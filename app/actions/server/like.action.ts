"use server";
import { getSupabaseAuth } from "@/app/lib/supabase";

export const addLike = async (id: string, user_id: string) => {
    try {
        const supabase = await getSupabaseAuth();

        // Check if the like already exists
        const { data: existingLike, error: likeError } = await supabase
            .from("likes")
            .select("id")
            .eq("podcast_id", id)
            .eq("user_id", user_id)
            .maybeSingle(); // Use maybeSingle to avoid throwing an error if no data is found

        if (likeError) {
            console.error("Error checking like:", likeError);
            return { success: false, error: likeError.message };
        }

        if (existingLike) {
            // Unlike: Remove the like
            const { error: deleteError } = await supabase
                .from("likes")
                .delete()
                .eq("id", existingLike.id);

            if (deleteError) {
                console.error("Error removing like:", deleteError);
                return { success: false, error: deleteError.message };
            }

            return { success: true, liked: false };
        } else {
            // Like: Add a new like
            const { error: insertError } = await supabase
                .from("likes")
                .insert([{ podcast_id: id, user_id }]);

            if (insertError) {
                console.error("Error inserting like:", insertError);
                return { success: false, error: insertError.message };
            }

            return { success: true, liked: true };
        }
    } catch (error) {
        console.error("Unexpected error:", error);
        return { success: false, error: "Unexpected error occurred" };
    }
};
