"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    async function handleAuth() {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error.message);
        router.push("/login");
        return;
      }

      if (session) {
        saveUserToDatabase(session.user);
        router.push("/podcasts");
      } else {
        router.push("/login");
      }
    }

    handleAuth();
  }, [router]);

  return <div>Signing you in...</div>;
}
async function saveUserToDatabase(user: any) {
  try {
    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        id:user.id,
        email: user.email,
        username: user.user_metadata.full_name || user.email.split("@")[0], 
        avatar_url: user.user_metadata.avatar_url,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to save user to the database");
    }

    const result = await res.json();

    return { success: true, data: result };
  } catch (error) {
    console.error("Error saving user:", error);
    return { success: false, error: (error as Error).message };
  }
}
