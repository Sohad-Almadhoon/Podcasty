"use client";
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
      const res = await fetch(
        `http://localhost:3000/api/podcasts/${podcastId}/like?user_id=${userId}`
      );

      if (!res.ok) {
        console.error("Failed to fetch likes:", res.statusText);
        return;
      }

      const { data } = await res.json();
      setLikes(data.likeCount);
      setIsLiked(data.userLiked);
    };

    fetchLikes();
  }, [podcastId, userId]);
  console.log(likes);
  const toggleLike = async () => {
    startTransition(() => {
      setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
      setIsLiked((prev) => !prev);
    });

    const res = await fetch(
      `http://localhost:3000/api/podcasts/${podcastId}/like`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId }),
      }
    );

    if (!res.ok) {
      console.error("Failed to toggle like:", res.statusText);
    }
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
