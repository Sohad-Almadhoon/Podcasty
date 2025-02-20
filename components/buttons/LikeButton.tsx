import { getLikes } from "@/app/actions/podcast.action";
import { addLike } from "@/app/actions/server/like.action";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { revalidatePath } from "next/cache";

const LikeButton = async ({
  podcastId,
  userId,
}: {
  podcastId: string;
  userId: string;
}) => {
  const { count , liked } = await getLikes(podcastId, userId);

  const toggleLike = async () => {
    "use server";
    await addLike(podcastId, userId);
    revalidatePath("/"); 
  };

  return (
    <form action={toggleLike}>
      <button
        type="submit"
        className="flex gap-1 items-center text-sm transition-all duration-200">
        {count} {liked ? <BsHeartFill className="text-red-500" /> : <BsHeart />}
      </button>
    </form>
  );
};

export default LikeButton;
