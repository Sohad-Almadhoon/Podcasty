import { Podcast } from "@/app/types";
import Image from "next/image";
import React, { FC } from "react";
import { BsHeartFill, BsHeadphones } from "react-icons/bs";

interface PodcastCardProps {
  podcast: Podcast;
}
const PodcastCard: FC<PodcastCardProps> = ({ podcast }) => {
  return (
    <div className="text-white rounded-md shadow-md overflow-hidden">
      <div className="relative lg:h-56 h-64 overflow-hidden object-cover rounded-xl">
        <Image
          src={
            podcast.image_url && podcast.image_url.trim() !== ""
              ? podcast.image_url
              : "/images/1.svg"
          }
          alt={podcast.podcast_name || "Podcast cover"}
          fill
          unoptimized
          objectFit="cover"
        />
      </div>

      <div className="p-3">
        <p className="font-semibold mb-2">
          {" "}
          {podcast.podcast_name.length > 30
            ? podcast.podcast_name.substring(0, 30) + "..."
            : podcast.podcast_name}
        </p>
        <p className="text-sm text-gray-300 h-12">
          {podcast.description.length > 100
            ? podcast.description.substring(0, 100) + "..."
            : podcast.description}
        </p>
      </div>
      <div className="flex justify-between gap-5 text-xs items-center  p-3">
        <p className="text-xs font-bold text-gray-400">
          Created
          {podcast.created_at
            ? ` At ${new Date(podcast.created_at).toLocaleDateString()}`
            : ` By ${podcast.users.username}`}
        </p>
        <div className="flex gap-3 items-center">
          <span className="flex gap-1 items-center">
            {podcast.play_count} <BsHeadphones className="text-xl" />
          </span>
          <span className="flex gap-1 items-center">
            {podcast.likes.length} <BsHeartFill />
          </span>
        </div>
      </div>
    </div>
  );
};

export default PodcastCard;
