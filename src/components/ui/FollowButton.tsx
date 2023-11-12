"use client";

import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";

type Props = {
  userId: string;
  username: string;
  followers: string[];
  className?: string;
};

const FollowButton = ({ userId, username, followers, className }: Props) => {
  const [isFollow, setIsFollow] = useState<boolean>(false);
  const [_, startTransition] = useTransition();
  const router = useRouter();

  const handleFollow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setIsFollow((prev) => !prev);
    const url = isFollow ? "/user/unfollow" : "/user/follow";

    startTransition(async () => {
      const { success } = await useFetch(url, {
        method: "PUT",
        cache: "no-store",
        body: JSON.stringify({ userId, username }),
      });

      if (!success) toast.error("Pls try again");

      router.refresh();
    });
  };

  useEffect(() => {
    if (followers.includes(userId)) setIsFollow(true);
  }, []);

  return (
    <button
      onClick={handleFollow}
      className={`py-1 bg-gray-200 dark:bg-white/10 rounded-lg ${className}`}>
      {isFollow ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;
