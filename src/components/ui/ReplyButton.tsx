"use client";

import { GlobalContext } from "@/context";
import FormatNumber from "@/utils/FormatNumber";
import Link from "next/link";
import { useContext } from "react";
import { FiMessageCircle } from "react-icons/fi";

type Props = {
  commentId: string;
  username: string;
  deepReply?: boolean;
  totalReplies?: number;
};

const ReplyButton = ({
  commentId,
  username,
  deepReply,
  totalReplies,
}: Props) => {
  const { setReply } = useContext(GlobalContext);

  const handleReply = () => {
    if (deepReply) {
      setReply({
        active: true,
        ref: commentId,
        to: username,
        deep: deepReply,
      });
    }
  };

  return deepReply ? (
    <button
      onClick={handleReply}
      className="flex gap-2 items-center text-gray-500 dark:text-gray-400 hover:text-blue-500 text-sm">
      <FiMessageCircle size={22} title="Reply" />
      <p>Reply</p>
    </button>
  ) : (
    <Link
      href={`/@${username}/comment/${commentId}`}
      className="flex gap-2 items-center text-gray-500 dark:text-gray-400 hover:text-blue-500 text-sm">
      <FiMessageCircle size={22} title="Reply" />
      {totalReplies ? (
        <p>
          <span className="text-black dark:text-white font-semibold">
            {FormatNumber(totalReplies)}{" "}
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            {totalReplies > 1 ? "Replies" : "Reply"}
          </span>
        </p>
      ) : (
        <p>Reply</p>
      )}
    </Link>
  );
};

export default ReplyButton;
