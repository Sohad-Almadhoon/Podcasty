"use client";
import { useAudio } from "@/app/providers/AudioProvider";
import { Podcast } from "@/app/types";
import React from "react";
import { BiMicrophone } from "react-icons/bi";


const PlayPodcastButton = ({ podcast }: { podcast: Podcast }) => {
  const { setAudio } = useAudio();

  const handlePlay = () => {
    setAudio({
      audioUrl: podcast.audio_url,
      podcastId: podcast.id,
      imageUrl: podcast.image_url!,
      title: podcast.podcast_name,
      author: podcast.users.username,
    });
  };
  return (
    <button
      className="bg-purple-700 flex items-center rounded-lg py-3 px-6 gap-3"
      onClick={handlePlay}>
      Play Podcast <BiMicrophone className="text-lg" />
    </button>
  );
};

export default PlayPodcastButton;
