import { notFound } from "next/navigation";
import VoicePlayer from "@/app/components/VoicePlayer";
import { BsHeartFill, BsPlayCircleFill } from "react-icons/bs";
import LikeButton from "@/app/components/LikeButton";
import Link from "next/link";

async function fetchPodcastDetails(id: string) {
  try {

    const res = await fetch(`http://localhost:3000/api/podcasts/${id}`);

    if (!res.ok) {
      console.error("Failed to fetch podcast details:", res.statusText);
      return null;
    }

    const data = await res.json();
    console.log(data);
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
    console.log(data);
    return data?.data || [];
  } catch (error) {
    console.error("Error fetching other podcasts:", error);
    return [];
  }
}

const PodcastDetails = async ({ params }: { params: { id: string } }) => {
  const id = decodeURIComponent(params.id);
  const podcast = await fetchPodcastDetails(id);
  if (!podcast) {
    return notFound();
  }
  console.log(podcast)
  const otherPodcasts = await fetchOtherPodcasts(podcast.user_id, id);
  return (
    <div className="min-h-screen px-10 text-white">
      <div className="flex flex-col lg:flex-row gap-5 mt-10">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">
            {podcast.podcast_name || "Untitled Podcast"}
          </h1>
          <p className="text-sm">
            {podcast.description || "No description available."}
          </p>

          <p className="mt-5 text-sm bg-black shadow-lg p-3 w-fit rounded-xl font-semibold flex items-center gap-6">
            AI VOICE{" "}
            <span className="text-purple-700 bg-white p-2 rounded-xl">
              {podcast.ai_voice || "Unknown"}
            </span>
          </p>

          {/* Stats */}
          <div className="flex justify-end gap-5 text-sm items-center mt-3">
            <span className="flex gap-1 items-center">
              {podcast.play_count || 0}{" "}
              <BsPlayCircleFill className="text-base" />
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
        </div>

        {/* Podcast Media */}
        <div className="flex-1 flex flex-col items-center lg:items-end">
          <img
            src={podcast.image_url}
            alt={podcast.podcast_name || "Podcast cover"}
            className="mb-4 rounded-full  w-72 h-72 object-cover shadow-lg"
          />
          <VoicePlayer url={podcast.audio_url} podcastId={id} />
        </div>
      </div>

      {/* More Podcasts Section */}
      <div className="mt-8">
        <h4 className="text-xl font-bold">More Podcasts by this User</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {otherPodcasts.length > 0 ? (
            otherPodcasts.map((podcast: any) => (
              <Link
                key={podcast.id}
                href={`/podcasts/${podcast.id}`}
                className="text-white rounded-md shadow-md overflow-hidden">
                <img
                  src={podcast.image_url}
                  alt={podcast.podcast_name}
                  className="w-full h-40 object-cover rounded-lg mb-1"
                />
                <div className="flex flex-col p-2">
                  <h5 className="text-lg font-semibold">
                    {podcast.podcast_name}
                  </h5>
                  <p className="text-sm">
                    {podcast.description.length > 100
                      ? podcast.description.substring(0, 100) + "..."
                      : podcast.description}
                  </p>
                  <div className="flex gap-2 justify-end text-sm">
                    <span className="flex items-center gap-1 justify-end">
                      <BsPlayCircleFill />
                      {podcast.play_count}
                    </span>
                    <span className="flex items-center gap-1 justify-end">
                      <BsHeartFill />
                      {podcast.likes.length}
                    </span>
                  </div>
                </div>
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
