"use client";

import CommentCard from "@/components/comment/CommentCard";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import CommentForm from "../form/CommentForm";
import type { CommentData, UserData } from "@/types";
import { useSearchParams } from "next/navigation";
import Adiv from "@/components/ui/Adiv";
import Link from "next/link";
import { useInfiniteQuery, useMutationState } from "@tanstack/react-query";
import { getCommentInPost } from "@/actions";
import Loader from "../ui/Loader";

interface Props {
  userId: string;
  postId: string;
  currentUser: UserData;
}

const CommentSection = ({ userId, postId, currentUser }: Props) => {
  const searchParams = useSearchParams();
  const query = searchParams.get("id");
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: [postId],
    queryFn: ({ pageParam }) => getCommentInPost({ postId, pageParam }),
    getNextPageParam: (LastPage, pages) => {
      if (LastPage.length < 10) return undefined;
      return pages.length;
    },
    initialPageParam: 0,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  useEffect(() => {
    query &&
      document
        .getElementById(query)
        ?.scrollIntoView({ block: "center", inline: "center" });
  }, []);

  const optimisticComment = useMutationState({
    filters: { status: "pending" },
    select: (mutation) => mutation.state.variables as CommentData,
  });

  const comments =
    data?.pages.flatMap((post) => [...optimisticComment, ...post]) ?? [];

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

        {isLoading && <Loader />}

        {hasNextPage && (
          <div ref={ref} className="flex justify-center items-center w-full">
            <BiLoaderAlt size={25} className="animate-spin" />
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
