import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="bg-gradient-to-b flex-1 from-gray-800 to-purple-600 flex flex-col text-white py-3 px-12">
      {/* Logo Section */}
      <Link href="/">
        <p className=" font-dancingScript text-5xl my-5">
          {" "}
          Podcasti
          <span className="text-purple-600">f</span>y
        </p>
      </Link>

      {/* Navigation Links */}
      <div className="flex gap-8 mb-3 flex-col">
        <Link href="/" className="text-lg hover:text-purple-300">
          Home
        </Link>
        <Link href="/discover" className="text-lg hover:text-purple-300">
          Discover
        </Link>
        <Link href="/profile" className="text-lg hover:text-purple-300">
          Profile
        </Link>
        <Link href="/create-podcast" className="text-lg hover:text-purple-300">
          Create Podcast
        </Link>
      </div>
    </div>
  );
};

export default Header;
