"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import { BsPlayCircleFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import Link from "next/link";

interface User {
  id: string;
  avatar_url?: string;
  email: string;
  username?: string;
  picture?: string;
}

const Profile = ({ params }: { params: { id: string } }) => {
  const [user, setUser] = useState<User | null>(null);
  const [podcasts, setPodcasts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const id = decodeURIComponent(params.id);


  useEffect(() => {
    const fetchData = async () => {
      if (!id) return; // Skip if user ID isn't available yet

      setLoading(true);

      // Fetch the user by id
      const { data: fetchedUser, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .single();

      if (userError) {
        console.error("Error fetching user:", userError.message);
      } else {
        setUser(fetchedUser);

        // Fetch podcasts for the user
        const { data: podcastData, error: podcastError } = await supabase
          .from("podcasts")
          .select("*")
          .eq("user_id", fetchedUser?.id);

        if (podcastError) {
          console.error("Error fetching podcasts:", podcastError.message);
        } else {
          setPodcasts(podcastData || []);
        }
      }

      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen p-6 text-white">Loading...</div>;
  }

  if (!user) {
    return <div className="min-h-screen p-6 text-white">User not found.</div>;
  }

  const handleDelete = async (podcastId: string) => {
    try {
      const response = await fetch(`/api/podcasts/${podcastId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Podcast deleted successfully");
        setPodcasts(podcasts.filter((podcast) => podcast.id !== podcastId)); // Update the state
      } else {
        throw new Error("Failed to delete podcast");
      }
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };
  return (
    <div className="min-h-screen p-8 text-white">
      <h1 className="text-2xl font-bold">Welcome, {user.username}</h1>

      {/* User Profile */}
      <div className="flex items-center gap-4 my-4 mb-12">
        {user.avatar_url && (
          <img
            src={user.avatar_url}
            alt="profile img"
            className="w-16 h-16 rounded-full"
          />
        )}
        <span>{user.email}</span>
      </div>

      {/* User Podcasts */}
      <h2 className="text-xl font-semibold my-5">Your Podcasts</h2>
      {podcasts.length > 0 ? (
        <ul className="mt-3 space-y-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {podcasts.map((podcast) => (
            <Link
              href={`/podcasts/${podcast.id}`}
              key={podcast.id}
              className="p-4 rounded-lg shadow-md relative">
              <img
                src={podcast.image_url}
                alt={podcast.podcast_name}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <div className="flex flex-col gap-1">
                <h5 className="text-lg font-semibold">
                  {podcast.podcast_name}
                </h5>
                <p className="text-sm flex-1">
                  {podcast.description.length > 100
                    ? podcast.description.substring(0, 100) + "..."
                    : podcast.description}
                </p>

                <span className="flex items-center gap-1 justify-end">
                  <BsPlayCircleFill />
                  {podcast.play_count}
                </span>
                <span className="flex items-center gap-1 justify-end">
                  <BsPlayCircleFill />
                  {podcast.play_count}
                </span>
              </div>
              <button
                onClick={() => handleDelete(podcast.id)}
                className="mt-3 p-2 absolute top-5 right-5 bg-purple-500 text-white rounded-full flex items-center gap-1 hover:bg-red-700">
                <AiFillDelete />
              </button>
            </Link>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 mt-3">You have no podcasts yet.</p>
      )}
    </div>
  );
};

export default Profile;
