"use client";

import { useEffect } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { useInView } from "react-intersection-observer";
import CommentForm from "../form/CommentForm";
import type { UserData } from "@/types";
import CommentCard from "./CommentCard";
import { getRepliedComment } from "@/utils/getInfiniteData";
import Link from "next/link";

interface Props {
  commentId: string;
  userId: string;
  query: string;
  currentUser: UserData;
}

const ReplySection = ({ commentId, userId, query, currentUser }: Props) => {
  const { ref, inView } = useInView();
  const { replies, isReachingEnd, setSize, size, isDeletedOne } =
    getRepliedComment(commentId);

  useEffect(() => {
    if (inView && !isReachingEnd && !isDeletedOne) setSize(size + 1);
  }, [inView]);

  useEffect(() => {
    query &&
      document
        .getElementById(query)
        ?.scrollIntoView({ block: "center", inline: "center" });
  }, []);

  return (
    <>
      <section className="max-md:pb-14 space-y-3">
        {replies.map((reply, i) => (
          <div
            id={reply._id}
            key={i}
            className={`border-b border-b-gray-300 dark:border-b-white/10 pb-3 last:border-none ${
              query === reply._id ? "bg-white/10" : ""
            }`}>
            <CommentCard
              variant="withflex"
              owner={reply.owner}
              optimistic={reply.optimistic}>
              <CommentCard.Header
                replyId={reply._id}
                commentId={commentId}
                owner={reply.owner}
                createdAt={reply.createdAt}
                userId={userId}
                type="reply"
              />
              <CommentCard.Body>{reply.text}</CommentCard.Body>
              <CommentCard.Footer
                owner={reply.owner}
                deepReply={true}
                commentId={reply._id}
                optimistic={reply.optimistic}
              />
            </CommentCard>
          </div>
        ))}

        {!isReachingEnd && !isDeletedOne && (
          <div ref={ref} className="flex justify-center items-center w-full">
            <BiLoaderAlt size={24} className="animate-spin" />
          </div>
        )}

        {!userId && (
          <Link
            href="/login"
            className="flex justify-between items-center px-3 py-2 bg-gray-100 drop-shadow-lg shadow-black dark:bg-white/5 rounded-md">
            Log in to like, comment and post.
          </Link>
        )}
      </section>

      {userId && (
        <CommentForm
          type="reply"
          commentId={commentId}
          currentUser={currentUser}
          userId={userId}
        />
      )}
    </>
  );
};

export default ReplySection;
