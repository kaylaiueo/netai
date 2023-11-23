"use client";

import { FiHeart } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import FormatNumber from "@/utils/FormatNumber";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost } from "@/actions";

type Props = {
  postId: string;
  userId: string;
  likes: string[];
};

const LikeButton = ({ postId, userId, likes }: Props) => {
  const router = useRouter();
  const [_, startTransition] = useTransition();
  const [isLike, setIsLike] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    onSettled: () => {
      queryClient.invalidateQueries();
    },
  });

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!userId) return router.push("/login");

    setIsLike((prev) => !prev);

    startTransition(async () => {
      const { message } = await likePost({ postId, userId });

      if (message.includes("Liked")) {
        setIsLike(true);
      } else if (message.includes("Disliked")) {
        setIsLike(false);
      }
    });

    likeMutation.mutate();
    router.refresh();
  };

  useEffect(() => {
    if (likes.includes(userId)) setIsLike(true);
  }, [postId]);

  return (
    <button
      type="button"
      onClick={handleLike}
      className={`flex gap-2 items-center text-gray-500 dark:text-gray-400 hover:text-red-500 text-sm ${
        isLike ? "text-red-600 dark:text-red-500" : ""
      }`}>
      <FiHeart
        size={23}
        title="Like"
        className={isLike ? "fill-red-600 dark:fill-red-500" : ""}
      />
      {likes.length > 0 && <p>{FormatNumber(likes.length)}</p>}
    </button>
  );
};

export default LikeButton;
