import { getPodcasts } from "@/app/actions/podcast.action";
import LoaderSpinner from "./loading";
import Discover from "@/components/Discover";


const Podcasts = async() => {
  const podcasts  = await getPodcasts("");
 
  if (!podcasts) return <LoaderSpinner />;


  return (
    <div className="p-5 min-h-screen">
      <h1 className="text-xl font-bold my-4 text-white">
        Discover Trending Podcasts
      </h1>
     <Discover podcasts={podcasts} />
    </div>
  );
};

export default Podcasts;
