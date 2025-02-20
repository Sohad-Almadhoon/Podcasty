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
            .maybeSingle(); // Avoid error if no like is found

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
        } else {
            // Like: Add a new like
            const { error: insertError } = await supabase
                .from("likes")
                .insert([{ podcast_id: id, user_id }]);

            if (insertError) {
                console.error("Error inserting like:", insertError);
                return { success: false, error: insertError.message };
            }
        }

        // Fetch the updated like count after liking/unliking
        const { data: likeCountData, error: countError } = await supabase
            .from("likes")
            .select("id", { count: "exact" })
            .eq("podcast_id", id);

        if (countError) {
            console.error("Error fetching like count:", countError);
            return { success: false, error: countError.message };
        }

        return {
            success: true,
            liked: !existingLike, // If a like was removed, liked should be false; otherwise, true
            count: likeCountData.length, // Get the updated like count
        };
    } catch (error) {
        console.error("Unexpected error:", error);
        return { success: false, error: "Unexpected error occurred" };
    }
};
