"use client";
import { useEffect, useRef, useState, ChangeEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { Progress } from "@/components/ui/progress";
import { useAudio } from "../providers/AudioProvider";
import { cn } from "@/lib/utils";
import { AiFillMuted, AiFillSound } from "react-icons/ai";
import { formatTime } from "@/lib/formatTime";

const PodcastPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const { audio } = useAudio();
  console.log(audio);

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

  useEffect(() => {
    if (audio?.audioUrl && audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true));
    } else {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  }, [audio]);

  const togglePlayPause = async () => {
    if (audioRef.current?.paused) {
      await audioRef.current.play();
      setIsPlaying(true);
      if (audio?.podcastId) await updatePlayCount(audio.podcastId);
    } else {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted((prev) => !prev);
    }
  };

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) audioRef.current.currentTime = newTime;
  };

  const updatePlayCount = async (id: string) => {
    try {
      await fetch(`/api/podcasts/${id}/play`, { method: "POST" });
    } catch (error) {
      console.error("Failed to update play count:", error);
    }
  };

  return (
    <div
      className={cn("sticky bottom-0 left-0 flex size-full flex-col", {
        hidden: !audio?.audioUrl,
      })}>
      <Progress
        value={(currentTime / duration) * 100}
        className="w-full"
        max={duration}
      />
      <section className="glassmorphism-black flex h-[112px] w-full items-center justify-between px-4 md:px-12">
        <audio ref={audioRef} src={audio?.audioUrl} className="hidden" />
        <div className="flex items-center gap-4 max-md:hidden">
          <Link href={`/podcast/${audio?.podcastId}`}>
            <Image
              src={audio?.imageUrl || "/images/player1.png"}
              width={64}
              height={64}
              alt="player"
              className="aspect-square rounded-xl"
            />
          </Link>
          <div className="flex w-[160px] flex-col">
            <h2 className="text-14 truncate font-semibold text-white-1">
              {audio?.title}
            </h2>
            <p className="text-12 font-normal text-white-2">{audio?.author}</p>
          </div>
        </div>
        <div className="flex-center cursor-pointer gap-3 md:gap-6">
          <button
            onClick={togglePlayPause}
            className="rounded-full w-10 h-10 flex justify-center items-center">
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
        <button onClick={toggleMute} className="cursor-pointer">
          {isMuted ? <AiFillMuted size={24} /> : <AiFillSound size={24} />}
        </button>
      </section>
    </div>
  );
};

export default PodcastPlayer;
