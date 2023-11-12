"use client";

import { BsThreeDots, BsShare, BsTrash } from "react-icons/bs";
import { useState, useTransition } from "react";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import DeleteImg from "@/utils/DeleteImg";
import toast from "react-hot-toast";
import {
  getCommentInPost,
  getPostByUsername,
  getRepliedComment,
} from "@/utils/getInfiniteData";

type Props = {
  id: string;
  type: "post" | "comment" | "reply";
  owner: string;
  userId: string;
  username?: string;
  image?: string;
  commentId?: string;
  replyId?: string;
  postId?: string;
};

const ThreeDots = (props: Props) => {
  const {
    id,
    type,
    owner,
    userId,
    username,
    image,
    postId,
    commentId,
    replyId,
  } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [_, startTransition] = useTransition();
  const router = useRouter();

  const { comments, mutate: mutateComments } = getCommentInPost(postId);
  const { replies, mutate: mutateReply } = getRepliedComment(commentId);
  const { posts, mutate: mutatePost } = getPostByUsername({
    username: username!,
    type: "allPosts",
  });

  const handleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDelete = () => {
    if (type === "comment") {
      mutateComments(
        [comments.filter((comment) => comment._id !== commentId)],
        {
          populateCache: true,
          rollbackOnError: true,
          revalidate: false,
        }
      );
    }

    if (type === "reply") {
      mutateReply([replies.filter((reply) => reply._id !== replyId)], {
        populateCache: true,
        rollbackOnError: true,
        revalidate: false,
      });
    }

    if (type === "post") {
      mutatePost([posts.filter((post) => post._id !== id)], {
        populateCache: true,
        rollbackOnError: true,
        revalidate: false,
      });
    }

    startTransition(async () => {
      if (image) DeleteImg(image);
      useFetch(`/${type}/${id}`, { method: "DELETE" });
    });

    setIsOpen(false);

    if (window.location.pathname.includes(id)) {
      router.push("/");
    }

    router.refresh();
    toast.success(type + " deleted", {
      className: "capitalize",
    });
  };

  const handleCopyUrl = () => {
    handleMenu();

    if (type === "post") {
      navigator.clipboard.writeText(
        `${window.location.origin}/@${username}/post/${id}`
      );
    } else if (type === "comment") {
      navigator.clipboard.writeText(
        `${window.location.origin}/@${username}/comment/${commentId}`
      );
    }
  };

  return (
    <div className="relative">
      <button onClick={handleMenu} className="flex items-center">
        <BsThreeDots title="Menu" size={18} />
      </button>

      {isOpen && (
        <div
          onClick={handleMenu}
          className="w-full h-screen flex justify-center items-center fixed top-0 left-0 z-50 bg-black/50"
        />
      )}

      {isOpen && (
        <div className="bg-white dark:bg-[#121212] shadow shadow-black dark:shadow-white fixed md:absolute w-full h-fit md:w-max py-5 md:p-2 rounded-t-lg px-2 md:rounded-xl space-y-2 md:-top-3 md:right-6 max-md:bottom-0 max-md:left-0 z-50">
          {(type === "post" || type === "comment") && (
            <>
              <button
                onClick={handleCopyUrl}
                className="flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-white/10 px-2 py-1 rounded-md cursor-pointer w-full">
                <BsShare />
                Copy Link
              </button>

              {owner === userId && (
                <div className="w-full h-[1px] bg-gray-200 dark:bg-white/20" />
              )}
            </>
          )}

          {owner === userId && (
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-white/10 px-2 py-1 rounded-md cursor-pointer w-full">
              <BsTrash />
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ThreeDots;
