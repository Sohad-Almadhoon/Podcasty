import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="bg-purple-600 flex justify-between items-center text-white py-3 px-6">
      <span className="text-2xl italic font-bold">Podcastyyy</span>
      <div className="flex items-center gap-5">
        <Link href="/">My Profile</Link>
        <Link href="/">My Profile</Link>
        <Link href="/">My Profile</Link>
        <Link href="/">My Profile</Link>
      </div>
    </div>
  );
};

export default Header;
