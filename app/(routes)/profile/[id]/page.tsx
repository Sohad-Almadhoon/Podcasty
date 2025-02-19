import Link from "next/link";
import { fetchPodcastsByUserId, fetchUserById } from "@/app/actions/users";
import PodcastCard from "@/components/PodcastCard";
import DeleteButton from "@/components/buttons/DeleteButton";
import { getUser } from "@/app/lib/supabase";

const Profile = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const { data: user } = await fetchUserById(id);
  const podcasts = await fetchPodcastsByUserId(id);
  const userInfo = await getUser();
  
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
            <div key={podcast.id} className="p-4 rounded-lg relative">
              <Link key={podcast.id} href={`/podcasts/${podcast.id}`}>
                <PodcastCard podcast={podcast} />
              </Link>
              {podcast.id == userInfo?.id && <DeleteButton podcast={podcast} />}
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
