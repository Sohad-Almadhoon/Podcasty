import { getSupabaseAuth } from "../lib/supabase";

export async function fetchUserById(id: string) {
    const supabase  = await getSupabaseAuth();
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            throw new Error(error.message);
        }

        if (!data) {
            throw new Error('User not found');
        }

        return { data };
    } catch (err) {
        throw new Error((err as Error).message);
    }
}

export async function fetchPodcastsByUserId(userId: string) {
    const supabase = await getSupabaseAuth();
    try {
        const { data, error } = await supabase
            .from("podcasts")
            .select("id, podcast_name, play_count, image_url, description, ai_voice , user_id, audio_url,likes(podcast_id), users:user_id (username,avatar_url)")
            .eq("user_id", userId);

        if (error) {
            throw new Error(error.message);
        }

        return data; 
    } catch (err) {
        throw new Error((err as Error).message); 
    }
}

export const deletePodcast = async (podcastId: string): Promise<void> => {
    try {
        const supabase = await getSupabaseAuth();
        const { error } = await supabase
            .from("podcasts")
            .delete()
            .eq("id", podcastId);

        if (error) {
            throw new Error(error.message || "Failed to delete podcast");
        }

        console.log(`Podcast with ID ${podcastId} deleted successfully.`);
    } catch (err) {
        console.error("Error deleting podcast:", err);
        throw new Error("Error deleting podcast. Please try again.");
    }
};
