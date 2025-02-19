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
  likes: { podcast_id: string }[]; 
  users: {
    username: string;
    avatar_url: string;
  }[];
}

export enum AiVoice {
  Alloy = 'alloy',
  Ash = 'ash',
  Coral = 'coral',
  Echo = 'echo',
  Fable = 'fable',
  Onyx = 'onyx',
  Nova = 'nova',
  Sage = 'sage',
  Shimmer = 'shimmer'
}