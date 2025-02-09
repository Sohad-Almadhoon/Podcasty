import Link from "next/link";
import React from "react";
import {
  AiFillHome,
  AiFillAudio,
  AiTwotonePlayCircle,
} from "react-icons/ai";
import {
  BiSolidUserVoice,
  BiSearch
} from "react-icons/bi";

const Header = () => {
  return (
    <div className="bg-gradient-to-b  flex flex-col text-white p-5 max-w-72 w-full">
      {/* Logo Section */}
      <Link href="/" className="mb-12 mt-5">
        <p className=" font-dancingScript text-4xl flex">
          {" "}
          <AiTwotonePlayCircle />
          Podcasti
          <span className="text-purple-600">f</span>y
        </p>
      </Link>

      {/* Navigation Links */}
      <div className="flex gap-8 flex-col">
        <Link
          href="/"
          className="text-[#EDEDED] hover:text-purple-300 flex items-center gap-4">
          <AiFillHome />
          Home
        </Link>
        <Link
          href="/podcasts"
          className="text-[#EDEDED] hover:text-purple-300 flex items-center gap-4">
          <BiSearch />
          Discover
        </Link>
        <Link
          href="/podcasts/create"
          className="text-[#EDEDED] hover:text-purple-300 flex items-center gap-4">
          <AiFillAudio />
          Create Podcast
        </Link>
        <Link
          href="/profile"
          className="text-[#EDEDED] hover:text-purple-300 flex items-center gap-4">
          <BiSolidUserVoice />
          Profile
        </Link>
      </div>
    </div>
  );
};

export default Header;
