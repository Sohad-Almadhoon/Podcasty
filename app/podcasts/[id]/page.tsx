import { notFound } from "next/navigation";
import VoicePlayer from "@/app/components/VoicePlayer";
import { BsPlayCircleFill } from "react-icons/bs";
import LikeButton from "@/app/components/LikeButton";

async function fetchPodcastDetails(id: string) {
  try {

    const res = await fetch(`http://localhost:3000/api/podcasts/${id}`);

    if (!res.ok) {
      console.error("Failed to fetch podcast details:", res.statusText);
      return null;
    }

    const data = await res.json();
    return data?.data || null;
  } catch (error) {
    console.error("Error fetching podcast:", error);
    return null;
  }
}

const PodcastDetails = async ({ params }: { params: { id: string } }) => {
  const id = decodeURIComponent(params.id);
  const podcast = await fetchPodcastDetails(id);
  if (!podcast) {
    return notFound();
  }
  return (
    <div className="min-h-screen px-10 text-white">
      <div className="flex flex-col lg:flex-row gap-5 mt-10">
        {/* Podcast Info */}
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
              SHIMMER
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
        {/* Future implementation for more podcasts */}
      </div>
    </div>
  );
};

export default PodcastDetails;
