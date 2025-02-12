import Link from "next/link";
import { BsHeartFill, BsPlayCircleFill } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import supabase from "@/lib/supabase";

const Podcasts = async () => {
  // Fetch podcasts and likes data in one go using Supabase's relational query
  const { data: podcasts, error: podcastError } = await supabase.from(
    "podcasts"
  ).select(`
      id,
      podcast_name,
      description,
      image_url,
      play_count,
      likes(podcast_id)
    `);
  if (podcastError) {
    console.error("Error fetching podcasts:", podcastError);
    return <div>Error loading podcasts</div>;
  }

  const podcastsWithLikes = podcasts?.map((podcast) => {
    const likeCount = podcast.likes.length; 
    return {
      ...podcast,
      likeCount,
    };
  });

  return (
    <div className="p-5 min-h-screen">
      <div className="max-w-xl mb-6 mt-5 relative">
        <input
          placeholder="Type here to search"
          className="p-2 pl-10 w-full rounded-md shadow-md bg-white outline-none placeholder:text-sm"
        />
        <BiSearch className="text-2xl text-black absolute top-2 left-3" />
      </div>
      <h1 className="text-xl font-bold my-4 text-white">
        Discover Trending Podcasts
      </h1>

      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
        {podcastsWithLikes &&
          podcastsWithLikes.map((podcast) => (
            <Link
              key={podcast.id}
              href={`/podcasts/${podcast.id}`}
              className="text-white rounded-md shadow-md overflow-hidden">
              <img
                src={podcast.image_url || "/images/1.jpeg"} // Default image if no image_url is present
                alt={podcast.podcast_name}
                className="rounded-xl h-56 w-full object-cover"
              />
              <div className="p-3">
                <p className="text-lg font-semibold">{podcast.podcast_name}</p>
                <p className="text-xs">{podcast.description}</p>
                <div className="flex justify-end gap-5 text-sm items-center">
                  <span className="flex gap-1 items-center">
                    {podcast.play_count}{" "}
                    <BsPlayCircleFill className="text-base" />
                  </span>
                  <span className="flex gap-1 items-center">
                    {podcast.likeCount} <BsHeartFill />
                  </span>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Podcasts;
