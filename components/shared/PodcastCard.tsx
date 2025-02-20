import { Podcast } from "@/app/types";
import React, { FC } from "react";
import { BsHeartFill, BsPlayCircleFill } from "react-icons/bs";
interface PodcastCardProps {
  podcast: Podcast;
}
const PodcastCard: FC<PodcastCardProps> = ({ podcast }) => {
  console.log(podcast);
  return (
    <div className="text-white rounded-md shadow-md overflow-hidden">
      <img
        src={podcast.image_url || "/images/1.jpeg"}
        alt={podcast.podcast_name}
        className="rounded-xl h-56 w-full object-cover"
      />
      <div className="p-3">
        <p className="text-lg font-semibold">{podcast.podcast_name}</p>
        <p className="text-sm text-gray-300 h-12">
          {podcast.description.length > 100
            ? podcast.description.substring(0, 100) + "..."
            : podcast.description}
        </p>
      </div>
      <div className="flex justify-between gap-5 text-sm items-center mt-3 p-3">
        <p className="text-xs font-bold text-gray-400">
          By { podcast.users?.username}
        </p>
        <div className="flex gap-3 items-center">
          <span className="flex gap-1 items-center">
            {podcast.play_count} <BsPlayCircleFill className="text-base" />
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
