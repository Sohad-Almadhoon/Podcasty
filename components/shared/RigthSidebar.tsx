import { BsHeadphones, BsPlayCircleFill } from "react-icons/bs";
import Link from "next/link";
import { fetchMostPlayedPodcasts } from "@/app/actions/podcast.action";
import { HeadphonesIcon } from "lucide-react";

export default async function RigthSidebar() {
  const mostPlayedPodcasts = await fetchMostPlayedPodcasts();
  return (
    <div className="bg-gradient-to-b lg:flex hidden flex-col text-white p-5 max-w-xs w-full">
      <h2 className="text-2xl font-bold text-white my-6 mb-10">Top Podcasts</h2>
      <ul>
        {mostPlayedPodcasts.length > 0 ? (
          <div className="flex flex-col gap-4">
            {mostPlayedPodcasts.map((podcast) => (
              <Link
                href={`/podcasts/${podcast.id}`}
                key={podcast.id}
                className="bg-gray-800 p-5 rounded-lg flex flex-col hover:bg-purple-700 transition duration-300 ease-in-out">
                <div className="gap-4">
                  <span className="font-semibold text-white text-lg">
                    {podcast.podcast_name}
                  </span>

                  <p className="text-xs text-slate-300">
                   By {podcast.users?.username || "Unknown"}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex gap-1 flex-col">
                    <div className="flex gap-2 items-center justify-end">
                      {podcast.play_count}
                      <BsHeadphones className="text-xl"/>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p>No podcasts found</p>
        )}
      </ul>
    </div>
  );
}
