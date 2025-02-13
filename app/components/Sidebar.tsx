"use client";
import React, { useEffect, useState } from "react";
import { BsPlayCircleFill } from "react-icons/bs";
import supabase from "@/lib/supabase"; // Make sure this import points to your Supabase client

interface Podcast {
  id: string;
  podcast_name: string;
  play_count: number;
  user_id: string; // Assuming you have a user_id in each podcast
}

interface User {
  id: string;
  username: string;
}

const Sidebar: React.FC = () => {
  const [mostPlayedPodcasts, setMostPlayedPodcasts] = useState<Podcast[]>([]);
  const [userNames, setUserNames] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    const fetchMostPlayedPodcasts = async () => {
      const { data, error } = await supabase
        .from("podcasts")
        .select("id, podcast_name, play_count, user_id")
        .order("play_count", { ascending: false })
        .limit(5);

      if (error) {
        console.error("Error fetching most-played podcasts:", error);
        return;
      }

      setMostPlayedPodcasts(data || []);
    };

    const fetchUserNames = async () => {
      const userIds = mostPlayedPodcasts.map((podcast) => podcast.user_id);
      const { data: users, error } = await supabase
        .from("users")
        .select("username, id")
        .in("id", userIds);

      if (error) {
        console.error("Error fetching user names:", error);
        return;
      }

      const userMap = new Map();
      users?.forEach((user: User) => {
        userMap.set(user.id, user.username);
      });

      setUserNames(userMap);
    };

    fetchMostPlayedPodcasts();
    fetchUserNames();
  }, [mostPlayedPodcasts]);

  return (
    <ul className="space-y-6">
      {mostPlayedPodcasts.map((podcast) => (
        <li
          key={podcast.id}
          className="bg-gray-800 p-5 rounded-lg flex flex-col hover:bg-purple-700 transition duration-300 ease-in-out">
          <div className="gap-4">
            <span className="font-semibold text-white text-lg">
              {podcast.podcast_name}
            </span>
            <p className="text-xs">
              {userNames.get(podcast.user_id) || "Unknown"}
            </p>{" "}
            {/* Display the username */}
          </div>
          <div className="text-right">
            <div className="flex gap-1 flex-col">
              <div className="flex gap-2 items-center justify-end">
                <BsPlayCircleFill />
                {podcast.play_count}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;
