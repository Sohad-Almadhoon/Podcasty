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

export interface User {
  id: string;
  avatar_url: string;
  email: string;
  username: string;
}
export
  interface Podcast {
  id: string;
  podcast_name: string;
  play_count: number;
  image_url?: string;
  audio_url?: string;
  description: string;
  likes: any;
  users: { username: string; avatar_url?: string; }

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