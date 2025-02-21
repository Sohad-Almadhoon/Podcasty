"use client";
import { Podcast } from "@/app/types";
import Link from "next/link";
import React from "react";
import PodcastCard from "./shared/PodcastCard";
interface DiscoverProps {
  podcasts: Podcast[] | [];
}
const Discover = ({ podcasts }: DiscoverProps) => {
    
    return (
       
        <div>
          <input
        type="text"
        placeholder="Search podcasts..."
        value={searchQuery}
        onChange={handleSearch}
        className="p-2 mb-4 border rounded-md"
      />
    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
      {podcasts.length > 0 ? (
        podcasts.map((podcast) => (
          <Link href={`/podcasts/${podcast.id}`} key={podcast.id}>
            <PodcastCard podcast={podcast} />
          </Link>
        ))
      ) : (
        <p className="text-white">No podcasts found.</p>
      )}
    </div>
    </div>
  );
};

export default Discover;
//pass data from server to client component when theres query search from server