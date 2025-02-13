"use client";
import  { signInWithGoogle, signOut , getUser } from "@/lib/auth";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiFillHome, AiFillAudio, AiTwotonePlayCircle } from "react-icons/ai";
import { BiSolidUserVoice, BiSearch } from "react-icons/bi";

interface User {
  id: string;
  avatar_url: string;
  email: string;
  full_name: string;
  picture: string;
}

const Header = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const fetchedUser = await getUser(); 
      if (fetchedUser) {
        setUser(fetchedUser); 
      }
    };

    checkUser();
  }, []);

  return (
    <div className="bg-gradient-to-b flex flex-col text-white p-5 max-w-72 w-full">
      {/* Logo Section */}
      <Link href="/" className="mb-12 mt-5">
        <p className="font-dancingScript text-4xl flex">
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

        {/* Conditional rendering based on user authentication */}
        {user ? (
          <>
            <Link
              href="/profile"
              className="text-[#EDEDED] hover:text-purple-300 flex items-center gap-4">
              <BiSolidUserVoice />
              Profile
            </Link>
            <button
              onClick={signOut}
              className="text-[#EDEDED] hover:text-purple-300 flex items-center gap-4">
              <BiSolidUserVoice />
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={signInWithGoogle}
            className="text-[#EDEDED] hover:text-purple-300 flex items-center gap-4">
            <BiSolidUserVoice />
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
