"use client";
import { signInWithGoogle, signOut } from "@/app/lib/auth";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { BiSolidLogIn, BiSolidLogOut, BiSolidUserVoice } from "react-icons/bi";
import SidebarLinks from "./SidebarLinks";
import Logo from "./Logo";
import { createClient } from "@/app/lib/supabase";

const LeftSidebar = () => {
  const [user, setUser] = useState<any | null>(null); // Using 'any' temporarily, you can define a User interface later

  useEffect(() => {
    const getUser = async () => {
      const supabase = await createClient();
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (session && session.user) {
        setUser({
          id: session.user.id,
          avatar_url: session.user.user_metadata.avatar_url || "",
          email: session.user.email || "",
          username: session.user.user_metadata.full_name || "",
        });
      } else {
        setUser(null); // No session, set user to null
      }
    };

    getUser(); // Ensure to call the function
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <Link href={`/profile/${user.id}`}>My Profile</Link>
          <button onClick={signOut}>Logout</button>
        </div>
      ) : (
        <button className="" onClick={signInWithGoogle}>
          SIGN IN WITH GOOGLE
        </button>
      )}
    </div>
  );
};

export default LeftSidebar;
