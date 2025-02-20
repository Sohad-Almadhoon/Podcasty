"use client";
import { getLikes } from "@/app/actions/podcast.action";
import { addLike } from "@/app/actions/server/like.action";
import { useState, useTransition, useEffect } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";

const LikeButton = ({
  podcastId,
  userId,
}: {
  podcastId: string;
  userId: string;
}) => {
  const [likes, setLikes] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchLikes = async () => {
      const data = await getLikes(podcastId, userId);
      console.log(data);
      if (data) {
        setLikes(data.count ?? 0);
        setIsLiked(data.userLiked);
      }
    };

    fetchLikes();
  }, [podcastId, userId]);

  const toggleLike = async () => {
    const newLikedState = !isLiked;

    // Optimistically update the UI
    setIsLiked(newLikedState);
    setLikes((prev) => (newLikedState ? prev + 1 : prev - 1));

    // Perform the server update
    startTransition(async () => {
      const updatedData = await addLike(podcastId, userId);

      // Ensure the server state is correctly reflected
      if (updatedData) {
        setLikes(updatedData.count ?? 0);
        setIsLiked(updatedData.liked ?? false);
      }
    });
  };

  return (
    <button
      onClick={toggleLike}
      className="flex gap-1 items-center text-sm transition-all duration-200"
      disabled={isPending}>
      {likes} {isLiked ? <BsHeartFill className="text-red-500" /> : <BsHeart />}
    </button>
  );
};

export default LikeButton;
