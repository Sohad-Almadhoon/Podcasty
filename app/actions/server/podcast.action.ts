"use server";
import { getSupabaseAuth } from "@/app/lib/supabase";

export async function deletePodcast(formData: FormData): Promise<void> {
    const podcastId = formData.get("podcastId") as string;
    const supabase = await getSupabaseAuth();
    try {
        const { error } = await supabase
            .from("podcasts")
            .delete()
            .eq("id", podcastId);

        if (error) {
            throw new Error(error.message);
        }
    } catch (error) {
        console.error("Error deleting podcast:", error);
    }
}