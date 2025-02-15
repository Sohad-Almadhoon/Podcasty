//@ts-nocheck
import { BsPlayCircleFill } from "react-icons/bs";
import Link from "next/link";
import supabase from "@/lib/supabase";

async function fetchMostPlayedPodcasts() {
  const { data, error } = await supabase
    .from("podcasts")
    .select("id, podcast_name, play_count, users:user_id (username)")
    .order("play_count", { ascending: false })
    .limit(5);

  if (error) {
    console.error("Error fetching most-played podcasts:", error);
    return [];
  }

  return data;
}

export default async function RigthSidebar() {
  const mostPlayedPodcasts = await fetchMostPlayedPodcasts();

  return (
    <div className="bg-gradient-to-b lg:flex hidden flex-col text-white p-5 max-w-xs w-full">
      <h2 className="text-2xl font-bold text-white my-6 mb-10">Top Podcasts</h2>
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

              <p className="text-xs">{podcast.users.username || "Unknown"}</p>
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
    </div>
  );
}
