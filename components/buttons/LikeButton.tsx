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
      await getLikes(userId);
      setLikes(data.likeCount);
      setIsLiked(data.userLiked);
    };

    fetchLikes();
  }, [podcastId, userId]);

  const toggleLike = async () => {
    startTransition(() => {
      setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
      setIsLiked((prev) => !prev);
    });

    await addLike(podcastId, userId);

  
  };
  return (
    <button
      onClick={() => startTransition(toggleLike)}
      className="flex gap-1 items-center text-sm transition-all duration-200"
      disabled={isPending}>
      {likes} {isLiked ? <BsHeartFill className="text-red-500" /> : <BsHeart />}
    </button>
  );
};

export default LikeButton;
