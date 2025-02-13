"use client";
import React, { useEffect, useState } from "react";
import { BsPlayCircleFill } from "react-icons/bs";
import supabase from "@/lib/supabase";
import Link from "next/link";

interface Podcast {
  id: number;
  podcast_name: string;
  play_count: number;

  users: { username: string };
}

const Sidebar: React.FC = () => {
  const [mostPlayedPodcasts, setMostPlayedPodcasts] = useState<Podcast[]>([]);

  useEffect(() => {
    const fetchMostPlayedPodcasts = async () => {
      const { data, error } = await supabase
        .from("podcasts")
        .select("id, podcast_name, play_count, users:user_id (username)")
        .order("play_count", { ascending: false })
        .limit(5);

      if (error) {
        console.error("Error fetching most-played podcasts:", error);
        return;
      }
      console.log(data);
      //@ts-ignore
      setMostPlayedPodcasts(data);
    };
    fetchMostPlayedPodcasts();
  }, [mostPlayedPodcasts]);

  return (
    <ul className="space-y-6">
      {mostPlayedPodcasts.map((podcast) => (
        <Link
          href={`/podcasts/${podcast.id}`}
          key={podcast.id}
          className="bg-gray-800 p-5 rounded-lg flex flex-col hover:bg-purple-700 transition duration-300 ease-in-out">
          <div className="gap-4">
            <span className="font-semibold text-white text-lg">
              {podcast.podcast_name}
            </span>
            <p className="text-xs">{podcast.users.username || "Unknown"}</p>{" "}
          </div>
          <div className="text-right">
            <div className="flex gap-1 flex-col">
              <div className="flex gap-2 items-center justify-end">
                <BsPlayCircleFill />
                {podcast.play_count}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </ul>
  );
};

export default Sidebar;
