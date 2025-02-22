import { getSupabaseAuth } from "../lib/supabase";

// Fetch user details by ID
export async function fetchUserById(id: string) {
    const supabase = await getSupabaseAuth();
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
        console.error("Error fetching user by ID:", err);
        throw new Error((err as Error).message);
    }
}

// Fetch podcasts by user ID
export async function fetchPodcastsByUserId(userId: string) {
    const supabase = await getSupabaseAuth();
    try {
        const { data, error } = await supabase
            .from("podcasts")
            .select("id, podcast_name, play_count, image_url, description, ai_voice, user_id, audio_url, likes(podcast_id), users:user_id (username, avatar_url)")
            .eq("user_id", userId);

        if (error) {
            throw new Error(error.message);
        }

        return data || []; // Return empty array if no podcasts found
    } catch (err) {
        console.error("Error fetching podcasts by user ID:", err);
        throw new Error((err as Error).message);
    }
}
