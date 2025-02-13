"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const VoicePlayer = ({
  url,
  podcastId,
}: {
  url: string;
  podcastId?: string;
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    const updateTime = () => setCurrentTime(audioElement.currentTime);
    const updateDuration = () => setDuration(audioElement.duration);

    audioElement.addEventListener("loadedmetadata", updateDuration);
    audioElement.addEventListener("timeupdate", updateTime);

    return () => {
      audioElement.removeEventListener("loadedmetadata", updateDuration);
      audioElement.removeEventListener("timeupdate", updateTime);
    };
  }, []);

  const handlePlay = async () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
      if (podcastId) {
        await updatePlayCount(podcastId);
      }
    }
  };

  const handlePause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const updatePlayCount = async (id: string) => {
    try {
      await fetch(`http://localhost:3000/api/podcasts/${id}/play`, {
        method: "POST",
      });
      console.log(`Play count incremented for podcast: ${id}`);
    } catch (error) {
      console.error("Failed to update play count:", error);
    }
  };

  return (
    <div className="flex items-center justify-center flex-1 px-1 py-0.5 gap-1">
      <audio ref={audioRef}>
        <source src={url} type="audio/mp3" />
      </audio>
      <button
        onClick={isPlaying ? handlePause : handlePlay}
        className="rounded-full w-10 h-10 flex justify-center items-center z-10">
        {isPlaying ? (
          <BsPauseFill className="text-3xl text-purple-700" />
        ) : (
          <BsPlayFill className="text-3xl text-purple-700" />
        )}
      </button>
      <span>{formatTime(currentTime)}</span>
      <input
        type="range"
        min="0"
        max={duration}
        step="1"
        value={currentTime}
        onChange={handleSliderChange}
        className="flex-1 appearance-none bg-purple-700 h-1"
      />
      <span>{formatTime(duration)}</span>
    </div>
  );
};

export default VoicePlayer;
