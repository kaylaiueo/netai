"use client";

import useFetch from "@/hooks/useFetch";
import { FiHeart } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import FormatNumber from "@/utils/FormatNumber";
import { getAllPosts, getPostByUsername } from "@/utils/getInfiniteData";

type Props = {
  postId: string;
  userId: string;
  likes: string[];
  username: string;
};

const LikeButton = ({ postId, userId, likes, username }: Props) => {
  const router = useRouter();
  const [_, startTransition] = useTransition();
  const [isLike, setIsLike] = useState<boolean>(false);
  const { mutate: mutateLikedPosts } = getPostByUsername({
    username,
    type: "likedPosts",
  });
  const { mutate: mutateAllPosts } = getAllPosts(userId, false);

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!userId) return router.push("/login");

    setIsLike((prev) => !prev);

    startTransition(async () => {
      const url = isLike ? `/post/dislike/${postId}` : `/post/like/${postId}`;

      await useFetch(url, {
        method: "PUT",
        cache: "no-store",
        body: JSON.stringify({ userId }),
      });

      isLike ? mutateLikedPosts() : mutateAllPosts();
      router.refresh();
    });
  };

  useEffect(() => {
    if (likes.includes(userId)) setIsLike(true);
  }, []);

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
        className={`${isLike ? "fill-red-500" : ""}`}
      />
      {likes.length > 0 && <p>{FormatNumber(likes.length)}</p>}
    </button>
  );
};

export default LikeButton;
