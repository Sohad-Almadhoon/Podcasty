import Link from "next/link";
import { AiFillLike } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { BsHeartFill, BsPlayBtn, BsPlayCircleFill } from "react-icons/bs";

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

      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
          <Link
            href="/podcasts/1"
            className="text-white rounded-md shadow-md overflow-hidden">
            <img
              src={"/images/1.jpeg"}
              alt=""
              className="rounded-xl h-56 w-full object-cover"
            />
            <div className="p-3">
              <p className="text-lg font-semibold">JS Jungle News</p>
              <p className="text-xs">
                Learn What is Javascript in Simple Terms...
              </p>
              <div className="flex justify-end gap-5 text-sm items-center">
                <span className="flex gap-1 items-center">
                  4 <BsPlayCircleFill className="text-base"/>
                </span>
                <span className="flex gap-1 items-center">
                  6 <BsHeartFill />
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
