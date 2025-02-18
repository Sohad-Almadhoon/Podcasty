"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import PodcastCard from "@/components/PodcastCard";
import { getSupabaseAuth } from "@/app/lib/supabase";
import { Podcast } from "@/app/types";
import LoaderSpinner from "@/app/loading";

const Podcasts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [podcastError, setPodcastError] = useState<string | null>(null);
 
  const fetchPodcasts = async () => {
    setLoading(true);
    try {
      const supabaseClient = await getSupabaseAuth();
      const { data, error } = await supabaseClient
        .from("podcasts")
        .select(
          `id,
          podcast_name,
          description,
          image_url,
          play_count,
          likes(podcast_id),
          users:user_id (username)`
        )
        .ilike("podcast_name", `%${searchTerm}%`);
      const plainData = data?.map((podcast) => ({
        ...podcast,
        likes: podcast.likes?.length || 0,
        username: podcast.users?.username || "Unknown",
      }));

      setPodcasts(plainData ?? []);
      if (error) throw error;
      //@ts-ignore
      setPodcastError(null);
    } catch (error) {
      setPodcastError("Error fetching podcasts. Please try again later." + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPodcasts();
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return <LoaderSpinner />
  }

  return (
    <div className="p-5 min-h-screen">
      <div className="max-w-xl mb-6 mt-5 relative">
        <input
          placeholder="Search podcasts by name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 pl-10 w-full rounded-md shadow-md bg-white outline-none placeholder:text-sm"
          aria-label="Search podcasts by name"
        />
        <BiSearch className="text-2xl text-black absolute top-2 left-3" />
      </div>

      <h1 className="text-xl font-bold my-4 text-white">
        Discover Trending Podcasts
      </h1>

      {podcastError && (
        <div className="text-red-500 mb-4">
          <p>{podcastError}</p>
        </div>
      )}

      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
        {podcasts.length > 0 ? (
          podcasts.map((podcast) => (
            <Link key={podcast.id} href={`/podcasts/${podcast.id}`}>
              <PodcastCard
                podcast={podcast}
                likes={podcast.likes?.length || 0}
                username={podcast.users?.username || "Unknown"}
              />
            </Link>
          ))
        ) : (
          <div className="text-white">No podcasts found for your search.</div>
        )}
      </div>
    </div>
  );
};

export default Podcasts;
