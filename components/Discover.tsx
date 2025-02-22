"use client";
import { Podcast } from "@/app/types";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import PodcastCard from "./shared/PodcastCard";
import LoaderSpinner from "@/app/(pages)/loading";

const useDebounce = (value: string, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

const Discover = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounce(searchQuery);

  useEffect(() => {
    const fetchPodcasts = async () => {
      setLoading(true);
      try {
        const url = debouncedSearch
          ? `http://localhost:3000/api/podcasts?query=${encodeURIComponent(
              debouncedSearch
            )}`
          : "http://localhost:3000/api/podcasts";

        const response = await fetch(url);
        const data = await response.json();
        setPodcasts(data);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, [debouncedSearch]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search podcasts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-2 mb-4 border rounded-md lg:w-1/2 w-full"
      />

      {loading && <LoaderSpinner />}

      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
        {podcasts.length > 0
          ? podcasts.map((podcast) => (
              <Link href={`/podcasts/${podcast.id}`} key={podcast.id}>
                <PodcastCard podcast={podcast} />
              </Link>
            ))
          : !loading && <p className="text-white">No podcasts found.</p>}
      </div>
    </div>
  );
};

export default Discover;
