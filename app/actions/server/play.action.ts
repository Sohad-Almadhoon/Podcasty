"use server";
import { getSupabaseAuth } from '@/app/lib/supabase';

export const play = async (podcastId: string) => {
    const supabase = await getSupabaseAuth();
    try {
        // Fetch the current play count
        const { data, error } = await supabase
            .from("podcasts")
            .select("play_count")
            .eq("id", podcastId)
            .single();

        if (error) {
            console.error("Error fetching play count:", error);
            return { success: false, error: error.message };
        }

        if (!data) {
            console.error("Podcast not found.");
            return { success: false, error: "Podcast not found." };
        }

        // Update the play count
        const newPlayCount = (data.play_count || 0) + 1;

        const { error: updateError } = await supabase
            .from("podcasts")
            .update({ play_count: newPlayCount })
            .eq("id", podcastId);

        if (updateError) {
            console.error("Error updating play count:", updateError);
            return { success: false, error: updateError.message };
        }

        return { success: true, play_count: newPlayCount };
    } catch (error) {
        console.error("Unexpected error:", error);
        return { success: false, error: "Unexpected error occurred." };
    }
};
