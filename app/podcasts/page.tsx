import { GetServerSideProps } from "next";
import Link from "next/link";
import { BsHeartFill, BsPlayCircleFill } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import supabase from "@/lib/supabase";

interface Podcast {
  id: string;
  name: string;
  description: string;
  play_count: number;
  likes: number;
  image_url?: string;
}


const Podcasts = async() => {
   const { data, error } = await supabase.from("podcasts").select("*");

   if (error) {
     console.error("Error fetching podcasts:", error);
     return <div>Error fetching podcasts</div>;
   }
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
        {data.map((podcast) => (
          <Link
            key={podcast.id}
            href={`/podcasts/${podcast.id}`}
            className="text-white rounded-md shadow-md overflow-hidden">
            <img
              src={podcast.image_url || "/images/1.jpeg"} // Assuming image URL is stored in podcast data
              alt={podcast.name}
              className="rounded-xl h-56 w-full object-cover"
            />
            <div className="p-3">
              <p className="text-lg font-semibold">{podcast.name}</p>
              <p className="text-xs">{podcast.description}</p>
              <div className="flex justify-end gap-5 text-sm items-center">
                <span className="flex gap-1 items-center">
                  3 <BsPlayCircleFill className="text-base" />
                </span>
                <span className="flex gap-1 items-center">
                  4 <BsHeartFill />
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
