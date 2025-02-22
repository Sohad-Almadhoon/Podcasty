import Link from "next/link";
import {
  fetchPodcastsByUserId,
  fetchUserById,
} from "@/app/actions/user.action";
import PodcastCard from "@/components/shared/PodcastCard";
import DeleteButton from "@/components/buttons/DeleteButton";
import { getUser } from "@/app/lib/supabase";
import Image from "next/image";
import LoaderSpinner from "../../loading";
import { paramsType } from "@/app/types";

const Profile = async (props: { params: paramsType }) => {
    const { id } = await props.params;
  const { data: user } = await fetchUserById(id);
  const podcasts = await fetchPodcastsByUserId(id);
  if (!podcasts) return <LoaderSpinner />;
  const userInfo = await getUser();
  return (
    <div className="min-h-screen lg:p-8 p-5 text-white">
      <h1 className="text-2xl font-bold">Welcome, {user.username}</h1>

      <div className="flex items-center gap-4 my-4 mb-12">
        <div className="relative size-16 rounded-full overflow-hidden">
          <Image
            src={user.avatar_url || "/images/1.jpeg"}
            alt="profile img"
            unoptimized
            fill
          />
        </div>

        <span>{user.email}</span>
      </div>

      <h2 className="text-xl font-semibold my-5">Your Podcasts</h2>

      {podcasts?.length > 0 ? (
        <ul className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
          {podcasts.map((podcast) => (
            <div key={podcast.id} className="rounded-lg relative">
              <Link href={`/podcasts/${podcast.id}`}>
                <PodcastCard podcast={podcast} />
              </Link>
              {podcast.user_id === userInfo?.id && (
                <DeleteButton podcastId={podcast.id} />
              )}
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
