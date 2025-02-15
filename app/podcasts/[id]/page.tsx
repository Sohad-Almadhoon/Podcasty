'use client';
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import LikeButton from "@/app/components/LikeButton";
import Link from "next/link";
import PodcastCard from "@/app/components/PodcastCard";
import { BiMicrophone } from "react-icons/bi";
import { HeadphonesIcon } from "lucide-react";
import { useAudio } from "@/app/providers/AudioProvider";

async function fetchPodcastDetails(id: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/podcasts/${id}`);
    if (!res.ok) {
      console.error("Failed to fetch podcast details:", res.statusText);
      return null;
    }
    const data = await res.json();
    return data?.data || null;
  } catch (error) {
    console.error("Error fetching podcast:", error);
    return null;
  }
}

async function fetchOtherPodcasts(userId: string, podcastId: string) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/podcasts/${podcastId}?userId=${userId}`
    );
    if (!res.ok) {
      console.error("Failed to fetch other podcasts:", res.statusText);
      return [];
    }
    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    console.error("Error fetching other podcasts:", error);
    return [];
  }
}

const PodcastDetails = () => {
  const { id } = useParams<{ id: string }>();
  if(!id) return null;
  console.log(id)
  const [podcast, setPodcast] = useState<any | null>(null);
  const [otherPodcasts, setOtherPodcasts] = useState<any[]>([]);
  const { setAudio } = useAudio();

  useEffect(() => {
    const loadData = async () => {
      const podcastData = await fetchPodcastDetails(id);
      if (podcastData) {
        setPodcast(podcastData);
        const otherPodcastsData = await fetchOtherPodcasts(podcastData.user_id, id);
        setOtherPodcasts(otherPodcastsData);
      } else {
        notFound();
      }
    };
    loadData();
  }, [id]);

  if (!podcast) {
    return null; // or return a loading state
  }

  const handlePlay = () => {
   console.log("Setting audio data:", {
     audioUrl: podcast.audio_url,
     podcastId: id,
     imageUrl: podcast.image_url,
     title: podcast.podcast_name,
     author: podcast.users.username,
   });

   setAudio({
     audioUrl: podcast.audio_url,
     podcastId: id,
     imageUrl: podcast.image_url,
     title: podcast.podcast_name,
     author: podcast.users.username,
   });
  };

  return (
    <div className="min-h-screen px-10 text-white pb-12">
      <h1 className="text-3xl font-bold my-5">{podcast.podcast_name || "Untitled Podcast"}</h1>
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 flex flex-col">
          <img
            src={podcast.image_url}
            alt={podcast.podcast_name || "Podcast cover"}
            className="mb-4 w-64 h-64 rounded-xl object-cover shadow-lg"
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-end gap-5 text-sm items-center mt-3">
            <span className="flex gap-1 items-center">
              {podcast.play_count || 0} <HeadphonesIcon />
            </span>
            <LikeButton podcastId={id} userId={podcast.user_id} />
          </div>
          <Link href={`/profile/${podcast.user_id}`} className="flex items-center gap-3 mt-5">
            <img
              src={podcast.users.avatar_url}
              alt=""
              className="w-11 h-11 rounded-full"
            />
            <span>By {podcast.users.username}</span>
          </Link>

          <p className="text-sm bg-black shadow-lg p-3 my-4 w-fit rounded-xl font-semibold flex items-center gap-6">
            AI VOICE
            <span className="text-purple-700 bg-white p-2 rounded-xl">
              {podcast.ai_voice || "Unknown"}
            </span>
          </p>
          <button className="bg-purple-700 flex items-center rounded-lg py-3 px-6 gap-3">
            Play Podcast <BiMicrophone className="text-lg" onClick={handlePlay} />
          </button>
        </div>
      </div>
      <div className="mt-5">
        <h2 className="text-2xl">Transcription</h2>
        <p className="text-sm mt-4 text-gray-300">
          {podcast.description || "No description available."}
        </p>
      </div>
      <hr className="border-b border-gray-200 my-5 opacity-50" />
      
      {/* More Podcasts Section */}
      <div className="mt-8">
        <h4 className="text-xl font-bold">More Podcasts by this User</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {otherPodcasts.length > 0 ? (
            otherPodcasts.map((podcast: any) => (
              <Link key={podcast.id} href={`/podcasts/${podcast.id}`}>
                <PodcastCard
                  podcast={podcast}
                  likes={podcast.likes?.length || 0}
                  username={podcast.users?.username || "Unknown"}
                />
              </Link>
            ))
          ) : (
            <p>No other podcasts available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PodcastDetails;
