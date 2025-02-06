import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="bg-white flex justify-between items-center text-black py-3 px-12">
      <Link href="/">
        {" "}
        <span className="text-2xl text-purple-900 italic font-bold">
          Podcastyyy
        </span>
      </Link>

      <div className="flex items-center gap-5">
        <Link href="/">
          <img
            src="/images/test.jpg"
            alt="Podcast illustration"
            className="rounded-full w-9 h-9  object-cover"
          />
        </Link>
        <Link href="/"></Link>
        <Link href="/"></Link>
      </div>
    </div>
  );
};

export default Header;
