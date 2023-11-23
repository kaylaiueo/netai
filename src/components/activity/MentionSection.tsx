"use client";

import Adiv from "@/components/ui/Adiv";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import PostCard from "../post/PostCard";
import { FaArrowsTurnRight } from "react-icons/fa6";
import CommentCard from "../comment/CommentCard";
import { BiLoaderAlt } from "react-icons/bi";
import Loader from "../ui/Loader";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getActivities } from "@/actions";

const MentionSection = ({ userId }: { userId: string }) => {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["mentions"],
    queryFn: ({ pageParam }) =>
      getActivities({ pageParam, userId, type: "mentions" }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < 10) return undefined;
      return pages.length;
    },
    initialPageParam: 0,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  const activities = data?.pages.flatMap((post) => post) ?? [];

  return activities.length > 0 ? (
    <section className="max-md:pb-14 space-y-3">
      {activities.map((props, i) => {
        const { content, author, ref, message, contentModel } = props;

        return (
          <div
            key={i}
            className="border-b border-b-white/10 pb-3 last:border-none">
            {(contentModel === "comments" || contentModel === "replies") && (
              <Adiv
                href={
                  contentModel === "comments"
                    ? `/@${author.username}/comment/${content._id}`
                    : `/@${ref.owner.username}/comment/${ref._id}?id=${content._id}`
                }>
                <p className="text-sm mb-2 text-gray-500 dark:text-gray-400 flex gap-2 items-center pl-3">
                  <FaArrowsTurnRight />
                  <span>{message}</span>
                </p>

                <CommentCard owner={author} variant="withflex">
                  <CommentCard.Header
                    disableMenu={true}
                    commentId={content._id}
                    owner={author}
                    createdAt={content.createdAt}
                    userId={userId}
                  />
                  <CommentCard.Body>{content.text}</CommentCard.Body>
                </CommentCard>
              </Adiv>
            )}

            {contentModel === "posts" && (
              <Adiv href={`/@${author.username}/post/${content._id}`}>
                <p className="text-sm mb-2 text-gray-500 dark:text-gray-400 flex gap-2 items-center pl-3">
                  <FaArrowsTurnRight />
                  {message}
                </p>

                <PostCard user={author} variant="withflex">
                  <PostCard.Header
                    disableMenu={true}
                    post={content}
                    user={author}
                    userId={userId}
                  />
                  <PostCard.Body postImage={content.image}>
                    {content.caption}
                  </PostCard.Body>
                </PostCard>
              </Adiv>
            )}
          </div>
        );
      })}

      {hasNextPage && activities.length > 0 && (
        <div ref={ref} className="flex justify-center items-center w-full">
          <BiLoaderAlt size={24} className="animate-spin" />
        </div>
      )}
    </section>
  ) : (
    <>
      {isLoading && <Loader />}
      {!isLoading && <p className="text-center">No mentions yet</p>}
    </>
  );
};

export default MentionSection;
