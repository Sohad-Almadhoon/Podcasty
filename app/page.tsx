"use client";
import { signInWithGoogle } from "@/lib/auth";
import supabase from "@/lib/supabase";
import { useEffect } from "react";

export default function Home() {
  async function user() {
    const user = await supabase.auth.getUser();
    console.log(user.data.user?.id);
  }
  useEffect(() => {
    user();
  }, []);
  return (
    <div>
      <h1>Welcome to Our Website!</h1>
     

      {/* <button onClick={signInWithGoogle}>Sign in with Google</button> */}
    </div>
  );
}
