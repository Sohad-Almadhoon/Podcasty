export interface AudioProps {
  audioUrl: string;
  podcastId: string;
  imageUrl: string;
  title: string;
  author: string;
}

export interface AudioContextType {
  audio: AudioProps | undefined;
  setAudio: React.Dispatch<React.SetStateAction<AudioProps | undefined>>;
}

export interface Podcast {
  id: string;
  podcast_name: string;
  description: string;
  image_url: string;
  play_count: number;
  ai_voice: AiVoice;
  user_id: string;
  audio_url: string;
  created_at?: string;
  likes: { podcast_id: string }[];
  users: {
    username: string;
    avatar_url: string;
  } | {
    username: string;
    avatar_url: string;
  }[];  
}

export type AiVoice = "alloy" | "ash" | "coral" | "echo" | "fable" | "onyx" | "nova" | "sage" | "shimmer";
export type paramsType = Promise<{ id: string }>;