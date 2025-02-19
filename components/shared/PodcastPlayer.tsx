"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Progress } from "./ui/progress";
import { BsPause, BsPlayFill, BsVolumeMute } from "react-icons/bs";
import { BiFastForward, BiRewind, BiSolidVolume } from "react-icons/bi";
import { useAudio } from "@/app/providers/AudioProvider";
import { formatTime } from "@/app/lib/utils";
import { cn } from "@/app/lib/utils";
import { play } from "@/app/actions/server/play.action";

const PodcastPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const { audio } = useAudio();
  const togglePlayPause = () => {
    if (audioRef.current?.paused) {
      audioRef.current?.play();
      setIsPlaying(true);
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

  const forward = () => {
    if (
      audioRef.current &&
      audioRef.current.currentTime &&
      audioRef.current.duration &&
      audioRef.current.currentTime + 5 < audioRef.current.duration
    ) {
      audioRef.current.currentTime += 5;
    }
  };

  const rewind = () => {
    if (audioRef.current && audioRef.current.currentTime - 5 > 0) {
      audioRef.current.currentTime -= 5;
    } else if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    const updateCurrentTime = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };

    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.addEventListener("timeupdate", updateCurrentTime);

      return () => {
        audioElement.removeEventListener("timeupdate", updateCurrentTime);
      };
    }
  }, []);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audio?.audioUrl) {
      if (audioElement) {
        audioElement.play().then(() => {
          setIsPlaying(true);
          play(audio.podcastId);
        });
      }
    } else {
      audioElement?.pause();
      setIsPlaying(true);
    }
  }, [audio]);
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div
      className={cn("sticky bottom-0 left-0 flex size-full flex-col", {
        hidden: !audio?.audioUrl || audio?.audioUrl === "",
      })}>
      <Progress
        value={(currentTime / duration) * 100}
        className="w-full"
        max={duration ? duration : 100}
      />
      <section className="flex h-[90px] w-full items-center justify-around px-4 max-md:justify-center max-md:gap-5 md:px-12">
        <audio
          ref={audioRef}
          src={audio?.audioUrl}
          className="hidden"
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleAudioEnded}
        />
        <div className="flex items-center gap-4 max-md:hidden">
          <Link href={`/podcasts/${audio?.podcastId}`}>
            <img src={audio?.imageUrl} alt="" className="h-10 w-10"/>
          </Link>
          <div className="flex w-[160px] flex-col">
            <h2 className="text-14 truncate font-semibold text-white-1">
              {audio?.title}
            </h2>
            <p className="text-12 font-normal text-white-2">{audio?.author}</p>
          </div>
        </div>
        <div className="flex items-center cursor-pointer gap-3 md:gap-6">
          <div className="flex items-center gap-1.5">
            <BiRewind className="text-2xl" onClick={rewind}/>
            <h2 className="text-12 font-bold text-white-4">-5</h2>
          </div>
          {isPlaying ? (
            <BsPause onClick={togglePlayPause} className="text-2xl"/>
          ) : (
            <BsPlayFill onClick={togglePlayPause} className="text-2xl"/>
          )}
          <div className="flex items-center gap-1.5">
            <h2 className="text-12 font-bold text-white-4">+5</h2>
            <BiFastForward onClick={forward} className="text-2xl" />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <h2 className="text-16 font-normal text-white-2 max-md:hidden">
            {formatTime(duration)}
          </h2>
          <div className="flex w-full gap-2">
            {isMuted ? (
              <BsVolumeMute onClick={toggleMute} className="text-2xl" />
            ) : (
              <BiSolidVolume onClick={toggleMute} className="text-2xl" />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PodcastPlayer;
