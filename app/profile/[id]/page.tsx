"use client";
import { useState, useEffect } from "react";
import { BsPlayCircleFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import Link from "next/link";
import { useParams } from "next/navigation";

interface User {
  id: string;
  avatar_url?: string;
  email: string;
  username?: string;
  picture?: string;
}

interface Podcast {
  id: string;
  podcast_name: string;
  play_count: number;
  image_url?: string;
  description: string;
}

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}`
        );
        const { data } = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    const fetchUserPodcasts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}/podcasts`
        );
        const data = await res.json();
        setPodcasts(data);
      } catch (err) {
        console.error("Error fetching podcasts:", err);
      }
    };

    fetchUserData();
    fetchUserPodcasts();
  }, [id]);

  const deletePodcast = async (podcastId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/podcasts/${podcastId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete podcast");
      }

      setPodcasts((prev) => prev.filter((podcast) => podcast.id !== podcastId));
    } catch (err) {
      console.error("Error deleting podcast:", err);
    }
  };

  if (!user) return <p className="text-white">Loading...</p>;

  return (
    <div className="min-h-screen p-8 text-white">
      <h1 className="text-2xl font-bold">Welcome, {user.username}</h1>

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

      <h2 className="text-xl font-semibold my-5">Your Podcasts</h2>
      {podcasts.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {podcasts.map((podcast) => (
            <div key={podcast.id} className="p-4 rounded-lg shadow-md relative">
              <Link href={`/podcasts/${podcast.id}`}>
                {podcast.image_url && (
                  <img
                    src={podcast.image_url}
                    alt={podcast.podcast_name}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                )}
                <div className="flex flex-col gap-1">
                  <h5 className="text-lg font-semibold">
                    {podcast.podcast_name}
                  </h5>
                  <p className="text-sm">
                    {podcast.description.length > 100
                      ? podcast.description.substring(0, 100) + "..."
                      : podcast.description}
                  </p>
                  <span className="flex items-center gap-1 justify-end">
                    <BsPlayCircleFill />
                    {podcast.play_count}
                  </span>
                </div>
              </Link>
              <button
                onClick={() => deletePodcast(podcast.id)}
                className="mt-3 p-2 absolute top-5 right-5 bg-purple-500 text-white rounded-full flex items-center gap-1 hover:bg-red-700">
                <AiFillDelete />
              </button>
            </div>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 mt-3">You have no podcasts yet.</p>
      )}
    </div>
  );
};

export default Profile;
