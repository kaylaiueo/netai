"use client";

import CommentCard from "@/components/comment/CommentCard";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import CommentForm from "../form/CommentForm";
import type { UserData } from "@/types";
import { useSearchParams } from "next/navigation";
import Adiv from "@/components/ui/Adiv";
import { getCommentInPost } from "@/utils/getInfiniteData";
import Link from "next/link";

interface Props {
  userId: string;
  postId: string;
  currentUser: UserData;
}

const CommentSection = ({ userId, postId, currentUser }: Props) => {
  const searchParams = useSearchParams();
  const query = searchParams.get("id");
  const { ref, inView } = useInView();
  const { comments, setSize, isReachingEnd, isDeletedOne, size } =
    getCommentInPost(postId);

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
        {comments.map((comment, i) => (
          <div
            id={comment._id}
            key={i}
            className={`border-b border-b-gray-300 dark:border-b-white/10 pb-3 last:border-none`}>
            <Adiv
              href={`/@${comment.owner.username}/comment/${comment._id}`}
              className={query === comment._id ? "bg-white/10" : ""}>
              <CommentCard
                variant="withflex"
                owner={comment.owner}
                optimistic={comment.optimistic}>
                <CommentCard.Header
                  commentId={comment._id}
                  owner={comment.owner}
                  createdAt={comment.createdAt}
                  userId={userId}
                  postId={postId}
                  type="comment"
                />
                <CommentCard.Body>{comment.text}</CommentCard.Body>
                <CommentCard.Footer
                  owner={comment.owner}
                  commentId={comment._id}
                  optimistic={comment.optimistic}
                  totalReplies={comment.replies.length}
                />
              </CommentCard>
            </Adiv>
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
          currentUser={currentUser}
          postId={postId}
          userId={userId}
        />
      )}
    </>
  );
};

export default CommentSection;
