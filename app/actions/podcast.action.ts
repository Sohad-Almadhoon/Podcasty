import { getSupabaseAuth } from "../lib/supabase";
import { Podcast } from "../types";

interface PodcastResponse {
    podcast?: Podcast | null;
    error?: string;
}
interface otherPodcastsResponse {
    podcast?: Podcast[] | [];
    error?: string;
}

export async function getPodcastDetails(id: string): Promise<PodcastResponse> {
    try {
        const supabaseClient = await getSupabaseAuth();

        const { data, error } = await supabaseClient
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
            `).eq("id", id);

        if (error) {
            throw new Error(error.message);
        }

        return { podcast: data[0] || null };
    } catch (error) {
        console.error("Error fetching podcast details:", error);
        return { error: (error as Error).message };
    }
}
export async function getOtherPodcasts(podcastId: string, userId: string): Promise<PodcastResponse> {
    try {
        const supabaseClient = await getSupabaseAuth();

        const { data, error } = await supabaseClient
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
            `).eq("user_id", userId).
            neq("id", podcastId);

        if (error) {
            throw new Error(error.message);
        }

        return { podcast: data[0] || null };
    } catch (error) {
        console.error("Error fetching podcast details:", error);
        return { error: (error as Error).message };
    }
}

export async function fetchMostPlayedPodcasts() {
    const supabaseClient = await getSupabaseAuth();
    const { data, error } = await supabaseClient
        .from("podcasts")
        .select("id, podcast_name, play_count, users:user_id (username)")
        .order("play_count", { ascending: false })
        .limit(5);

    if (error) {
        console.error("Error fetching most-played podcasts:", error);
        return [];
    }

    return data;
}

export const getLikes = async (podcastId: string, user_id: string) => {
    const supabase = await getSupabaseAuth();

    try {
        const { count, error: countError } = await supabase
            .from("likes")
            .select("*", { count: "exact", head: true })
            .eq("podcast_id", podcastId);

        if (countError) {
            console.error("Error fetching like count:", countError);
        }

        let userLiked = false;
            const { data: existingLike, error: likeError } = await supabase
                .from("likes")
                .select("id")
                .eq("podcast_id", podcastId)
                .eq("user_id", user_id)
                .single();

            if (likeError && likeError.code !== "PGRST116") {
                console.error("Error checking user like:", likeError);
            }

            userLiked = !!existingLike;
    } catch (error) {
        console.error("Unexpected error:", error);
    }
}

export const getPodcasts = async (): Promise<PodcastResponse> => {
    try {
        const supabaseClient = await getSupabaseAuth();
        const { data, error } = await supabaseClient
            .from("podcasts")
            .select(
                `id, podcast_name, description, image_url, play_count, likes(podcast_id), users:user_id (username)`
            );
        if (error) throw error;
        return { podcasts: data || [] };
    } catch (error) {
        console.error("Error fetching podcasts:", error);
        return { error: (error as Error).message };
    }
};