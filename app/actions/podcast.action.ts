import { getSupabaseAuth } from "../lib/supabase";
import { Podcast } from "../types";

interface PodcastResponse {
    podcast?: Podcast | null;
    podcasts?: Podcast[] | [];
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
            `)
            .eq("id", id).single();

        if (error) {
            throw new Error(error.message);
        }

        return { podcast: data || null };
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
            `)
            .eq("user_id", userId)
            .neq("id", podcastId);

        if (error) {
            throw new Error(error.message);
        }

        return { podcasts: data || [] };
    } catch (error) {
        console.error("Error fetching other podcasts:", error);
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

export const getLikes = async (podcastId: string, userId: string) => {
    try {
        const supabase = await getSupabaseAuth();

        // Fetch like count for the podcast
        const { count, error: countError } = await supabase
            .from("likes")
            .select("*", { count: "exact", head: true })
            .eq("podcast_id", podcastId);

        if (countError) {
            console.error("Error fetching like count:", countError.message);
            return { count: 0, liked: false, error: countError.message };
        }

        // Check if the user has liked this podcast
        const { data: likeData, error: likeError } = await supabase
            .from("likes")
            .select("id")
            .eq("podcast_id", podcastId)
            .eq("user_id", userId)
            .single();

        if (likeError && likeError.code !== "PGRST116") {
            console.error("Error checking user like:", likeError.message);
            return { count: count ?? 0, liked: false, error: likeError.message };
        }

        // Return a plain object
        return { count: count ?? 0, liked: !!likeData, error: null };
    } catch (error: any) {
        console.error("Unexpected error in getLikes:", error);
        return { count: 0, liked: false, error: error.message || "Unknown error" };
    }
};



export async function getPodcasts(): Promise<Podcast[] | null> {
    try {
        const supabase = await getSupabaseAuth();
        const { data, error } = await supabase.from("podcasts").select(`
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
            `);
        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        console.error("Error fetching podcasts:", error);
        return null;
    }
}
