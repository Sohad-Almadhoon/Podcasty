//@ts-nocheck
import Link from "next/link";
import { HeadphonesIcon } from "lucide-react";
import LikeButton from "@/components/buttons/LikeButton";
import PodcastCard from "@/components/PodcastCard";
import PlayPodcastButton from "@/components/buttons/PlayPodcastButton";
import { getPodcastDetails } from "@/app/actions/podcasts.actions";
import { notFound } from "next/navigation";
import LoaderSpinner from "@/app/loading";

export default async function PodcastDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  if (!id) return notFound();

  const { data: podcast, error } = await getPodcastDetails(id);
  if (error || !podcast) return notFound();
  if(!podcast) return LoaderSpinner();

  const { data: otherPodcasts } = await getPodcastDetails(id, podcast.user_id);

  return (
    <div className="min-h-screen px-10 text-white pb-12">
      <h1 className="text-3xl font-bold my-5">
        {podcast.podcast_name || "Untitled Podcast"}
      </h1>
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
          <Link
            href={`/profile/${podcast.user_id}`}
            className="flex items-center gap-3 mt-5">
            <img
              src={podcast.users.avatar_url}
              alt=""
              className="w-11 h-11 rounded-full"
            />
            <span>By {podcast.users.username}</span>
          </Link>
          <PlayPodcastButton podcast={podcast} />
          <p className="text-sm bg-black shadow-lg p-3 my-4 w-fit rounded-xl font-semibold flex items-center gap-6">
            AI VOICE
            <span className="text-purple-700 bg-white p-2 rounded-xl">
              {podcast.ai_voice || "Unknown"}
            </span>
          </p>
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
          {otherPodcasts && otherPodcasts.length > 0 ? (
            otherPodcasts.map((p: any) => (
              <Link key={p.id} href={`/podcasts/${p.id}`}>
                <PodcastCard
                  podcast={p}
                  likes={p.likes?.length || 0}
                  username={p.users?.username || "Unknown"}
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
}
