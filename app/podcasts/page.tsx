import Link from "next/link";
import { BiSearch } from "react-icons/bi";

const Podcasts = () => {
  return (
    <div className="p-5 min-h-screen">
      <div className="max-w-xl mb-6 mt-5 relative">
        <input
          placeholder="Type here to search"
          className="p-2 pl-10 w-full rounded-md shadow-md  bg-white outline-none placeholder:text-sm"
        />
        <BiSearch className="text-2xl text-black absolute top-2 left-3" />
      </div>
      <h1 className="text-xl font-bold my-4 text-white">
        Discover Trending Podcasts
      </h1>

      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
          <Link
            href="/"
            className="text-white shadow-md rounded-md overflow-hidden">
            <img src={"/images/1.jpeg"} alt="" className="rounded-xl" />
            <div className="p-3">
              <p className="text-lg font-semibold">JS Jungle News</p>
              <p className="text-sm ">
                Learn What is Javascript in Simple Terms
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Podcasts;
