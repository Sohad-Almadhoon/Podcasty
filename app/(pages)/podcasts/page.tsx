import Link from "next/link";
import PodcastCard from "@/components/shared/PodcastCard";
import { getPodcasts } from "@/app/actions/podcast.action";
import { Podcast } from "@/app/types";


const Podcasts = async () => {
  const podcasts: Podcast[] | null = await getPodcasts();
  console.log(podcasts);
  if (!podcasts) return <div>Loading...</div>;
  return (
    <div className="p-5 min-h-screen">
      <h1 className="text-xl font-bold my-4 text-white">
        Discover Trending Podcasts
      </h1>

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

export default Podcasts;