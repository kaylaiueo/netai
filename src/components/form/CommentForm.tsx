"use client";

import ProfilePicture from "@/components/ui/ProfilePicture";
import { GlobalContext } from "@/context";
import { FiX } from "react-icons/fi";
import { RiSendPlane2Line } from "react-icons/ri";
import { useContext, useRef, useState } from "react";
import { addComment } from "@/actions";
import type { CommentData, ReplyData, UserData } from "@/types";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  currentUser?: UserData;
  postId?: string;
  commentId?: string;
  userId: string;
  type?: "reply";
}

const CommentForm = ({
  currentUser,
  postId,
  userId,
  type,
  commentId,
}: Props) => {
  const router = useRouter();
  const { reply, setReply } = useContext(GlobalContext);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [comment, setComment] = useState<string>("");
  const queryClient = useQueryClient();

  const addCommentMutation = useMutation({
    mutationFn: async (newComment: CommentData & ReplyData) => {
      const url =
        type === "reply" ? `/reply/${commentId}` : `/comment/${postId}`;

      const values = {
        owner: userId,
        text: comment,
        ...(type === "reply" ? { ref: commentId as string } : { ref: postId! }),
      };

      const { success } = await addComment(url, values);
      if (success) {
        router.refresh();
        toast.success("Comment Added");
      }

      if (!success) {
        toast.error("Pls try again");
      }
    },
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: [type === "reply" ? commentId : postId],
      }),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.reset();
    textAreaRef.current?.removeAttribute("style");

    const newComment: CommentData & ReplyData = {
      _id: "optimistic",
      ref: "optimistic",
      owner: currentUser as string & UserData,
      text: comment,
      createdAt: Date.now(),
      replies: [],
      optimistic: true,
    };

    addCommentMutation.mutate(newComment);
    setReply({ active: false, ref: "", to: "", deep: false });
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.currentTarget.value);

    e.currentTarget.style.height = "auto";
    e.currentTarget.style.height = `${
      e.currentTarget.scrollHeight > 112 ? 112 : e.currentTarget.scrollHeight
    }px`;
  };

  if (reply.active) {
    textAreaRef.current?.focus();
    setTimeout(() => {
      textAreaRef.current?.setSelectionRange(10000, 10000);
    }, 0);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 items-center max-md:fixed max-md:px-3 py-2 sticky bottom-0 bg-white dark:bg-[#121212] right-0 left-0">
      <ProfilePicture src={currentUser?.picture} className="w-9 h-max" />

      <div className="w-full relative flex flex-col">
        {reply.active && (
          <div className="sticky flex justify-between w-full bg-gray-200 dark:bg-white/10 -top-8 py-1 px-4 rounded-t-md">
            <p>{reply.active && `Replying to @${reply.to}`}</p>

            <button
              onClick={() => {
                setReply({
                  active: false,
                  ref: "",
                  to: "",
                  deep: false,
                });
              }}>
              <FiX size={23} />
            </button>
          </div>
        )}

        <textarea
          ref={textAreaRef}
          rows={1}
          required
          maxLength={320}
          onChange={handleChange}
          defaultValue={reply.deep ? `@${reply.to} ` : ""}
          placeholder="Add a comment..."
          className="w-full py-2 px-4 rounded-md bg-gray-200 dark:bg-white/10 outline-none"
        />
      </div>

      {textAreaRef.current?.value && (
        <button type="submit" className="p-2">
          <RiSendPlane2Line size={23} />
        </button>
      )}
    </form>
  );
};

export default CommentForm;
