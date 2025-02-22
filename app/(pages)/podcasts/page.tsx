import Discover from "@/components/Discover";

const Podcasts = async () => {
  return (
    <div className="p-5 min-h-screen">
      <h1 className="text-xl font-bold my-4 text-white">
        Discover Trending Podcasts
      </h1>
     <Discover />
    </div>
  );
};

export default Podcasts;
