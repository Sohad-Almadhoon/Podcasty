import { createClient } from "../lib/supabase";
export async function getPodcastDetails(id: string, userId?: string) {
    const supabase= await createClient();
    try {
        let query;

        if (userId) {
            query = supabase
                .from("podcasts")
                .select(`
                    id,
                    podcast_name,
                    description,
                    image_url,
                    audio_url,
                    play_count,
                    ai_voice,
                    user_id,
                    users:user_id (username),
                    likes(podcast_id)
                `)
                .eq("user_id", userId)
                .neq("id", id);
        } else {
            query = supabase
                .from("podcasts")
                .select(`
                    id,
                    podcast_name,
                    description,
                    image_url,
                    audio_url,
                    play_count,
                    ai_voice,
                    user_id,
                    users:user_id (username, avatar_url),
                    likes(podcast_id)
                `)
                .eq("id", id)
                .single();
        }

        const { data, error } = await query;

        if (error) {
            throw new Error(error.message);
        }

        return { data, error: null };
    } catch (error) {
        console.error("Error fetching podcast details:", error);
        return { data: null, error: (error as Error).message };
    }
}
