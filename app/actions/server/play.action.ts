"use server";
import { getSupabaseAuth } from '@/app/lib/supabase';

export const play = async (podcastId:string) => {
    const supabase = await getSupabaseAuth();
    try {
        const { data, error } = await supabase
            .from("podcasts")
            .select("play_count")
            .eq("id", podcastId)
            .single();
        const { error: updateError } = await supabase
            .from("podcasts")
            .update({ play_count: data.play_count + 1 })
            .eq("id", podcastId);

        if (updateError) {
            throw updateError;
        }

    } catch (error) {
        console.error("Error updating play count:", error);
       
    }
}
