"use client";
import { signInWithGoogle, signOut, getUser } from "@/lib/auth";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  AiFillHome,
  AiFillAudio,
  AiTwotonePlayCircle,
  AiFillCloseCircle,
  AiOutlineMenu,
  AiOutlineCloseCircle,
  AiOutlineClose,
} from "react-icons/ai";
import { BiSolidUserVoice, BiSearch, BiMenu, BiX, BiWindowClose } from "react-icons/bi";
import { twMerge } from "tailwind-merge";

interface User {
  id: string;
  avatar_url: string;
  email: string;
  full_name: string;
  picture: string;
}

const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const fetchedUser = await getUser();
      if (fetchedUser) {
        setUser(fetchedUser);
      }
    };

    checkUser();
  }, []);
  // ""
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  return (
    <div className="lg:max-w-72 lg:w-full min-h-screen flex flex-col z-50 lg:z-auto lg:relative absolute inset-0">
      <button
        onClick={toggleMenu}
        className="lg:hidden flex items-center text-white p-4">
        {isMenuOpen ? (
          <AiOutlineClose className="text-3xl" />
        ) : (
          <AiOutlineMenu className="text-3xl" />
        )}
      </button>

      {isMenuOpen && (
        <div
          className={`flex flex-col p-5 text-white lg:w-full w-screen h-full  bg-gradient-to-b  from-black via-purple-950 to-purple-700 transition-all duration-300 ease-in-out`}>
          <Link href="/" className="mb-12">
            <p className="font-dancingScript text-4xl flex lg:mt-8">
              <AiTwotonePlayCircle />
              Podcasti
              <span className="text-purple-600 ">f</span>y
            </p>
          </Link>
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
            {user ? (
              <>
                <Link
                  href={`/profile/${user.id}`}
                  className="text-[#EDEDED] hover:text-purple-300 flex items-center gap-4">
                  <BiSolidUserVoice />
                  My Profile
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

          {/* Conditional rendering based on user authentication */}
        </div>
      )}
    </div>
  );
};

export default Header;
