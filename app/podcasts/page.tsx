"use client";
import Link from "next/link";
import { BsHeartFill, BsPlayCircleFill } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import supabase from "@/lib/supabase";
import { useEffect, useState } from "react";

const Podcasts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [podcasts, setPodcasts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [podcastError, setPodcastError] = useState<string | null>(null);

  const fetchPodcasts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
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

      if (error) throw error;
      setPodcasts(data || []);
      setPodcastError(null); 
    } catch (error) {
      setPodcastError("Error fetching podcasts. Please try again later.");
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

      {loading ? (
        <div className="text-center">
          <p className="text-white">Loading podcasts...</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
          {podcasts.length > 0 ? (
            podcasts.map((podcast) => (
              <Link
                key={podcast.id}
                href={`/podcasts/${podcast.id}`}
                className="text-white rounded-md shadow-md overflow-hidden">
                <img
                  src={podcast.image_url || "/images/1.jpeg"}
                  alt={podcast.podcast_name}
                  className="rounded-xl h-56 w-full object-cover"
                />
                <div className="p-3">
                  <p className="text-lg font-semibold">
                    {podcast.podcast_name}
                  </p>
                  <p className="text-sm">
                    {podcast.description.length > 100
                      ? podcast.description.substring(0, 100) + "..."
                      : podcast.description}
                  </p>

                  <div className="flex justify-between gap-5 text-sm items-center mt-3">
                    <p className="text-xs my-5 font-bold">
                      By {podcast.users?.username || "Unknown"}
                    </p>
                    <div className="flex gap-3 items-center">
                      <span className="flex gap-1 items-center">
                        {podcast.play_count}{" "}
                        <BsPlayCircleFill className="text-base" />
                      </span>
                      <span className="flex gap-1 items-center">
                        {podcast.likes.length} <BsHeartFill />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-white">No podcasts found for your search.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Podcasts;
