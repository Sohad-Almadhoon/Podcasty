"use server";
import { getSupabaseAuth } from "@/app/lib/supabase";

export const deletePodcast = async (id: string) => {
    const supabase = await getSupabaseAuth();

    try {
        const { error } = await supabase
            .from('podcasts')
            .delete()
            .eq('id', id);

        if (error) throw error;
       
    } catch (error) {
       
    }
}