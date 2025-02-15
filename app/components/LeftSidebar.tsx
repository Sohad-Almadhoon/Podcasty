"use client";
import { signInWithGoogle, signOut, getUser } from "@/lib/auth";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { BiSolidLogIn, BiSolidLogOut, BiSolidUserVoice } from "react-icons/bi";
import SidebarLinks from "./SidebarLinks";
import { User } from "../types";
import Logo from "./Logo";

const LeftSidebar = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    (async () => {
      const fetchedUser = await getUser();
      if (fetchedUser) setUser(fetchedUser);
    })();
  }, []);

  return (
    <div className="lg:max-w-72 lg:w-full min-h-screen lg:flex flex-col hidden">
      <div className="flex flex-col p-5 text-white">
        <Logo/>
          <div className="flex gap-8 flex-col">
            <SidebarLinks />
            {user ? (
              <div className="ml-5 flex flex-col gap-8">
                <Link
                  href={`/profile/${user.id}`}
                  className="text-[#EDEDED] hover:text-purple-300 flex items-center gap-4">
                  <BiSolidUserVoice /> My Profile
                </Link>
                <button
                  onClick={signOut}
                  className="text-[#EDEDED] hover:text-purple-300 flex items-center gap-4">
                  <BiSolidLogOut /> Logout
                </button>
              </div>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="text-[#EDEDED] hover:text-purple-300 flex items-center gap-4 ml-5">
                <BiSolidLogIn /> Sign In
              </button>
            )}
          </div>
        </div>
    </div>
  );
};


export default LeftSidebar;
