"use client";

import Adiv from "@/components/ui/Adiv";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import PostCard from "../post/PostCard";
import Link from "next/link";
import { BiLoaderAlt } from "react-icons/bi";
import Image from "next/image";
import { FiHeart, FiMessageCircle } from "react-icons/fi";
import FormatNumber from "@/utils/FormatNumber";
import type { CommentData } from "@/types";
import Loader from "../ui/Loader";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getUserPosts } from "@/actions";

interface Props {
  username: string;
  userId: string;
  type: "likedPosts" | "media" | "userPosts";
}

const PostSection = ({ username, userId, type }: Props) => {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: [username + type],
    queryFn: ({ pageParam }) => getUserPosts({ pageParam, username, type }),
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

  const posts = data?.pages.flatMap((post) => post) ?? [];

  return type === "media" ? (
    <>
      {posts.length > 0 ? (
        <section className="gap-2 columns-2 max-md:pb-14">
          {posts.map((post, i) => {
            const totalReplies = post.comments
              .map((result: CommentData) => result.replies?.length)
              .reduce((a, b) => a + b, 0);
            const totalComments = post.comments.length + totalReplies;

            return (
              <div
                key={i}
                className="relative flex justify-center items-center">
                {post.image?.src && (
                  <Image
                    alt="Post"
                    src={post.image.src}
                    height={post.image.height}
                    width={post.image.width}
                    className="rounded-md aspect-auto mb-2"
                  />
                )}

                <Link
                  href={`/@${post.owner.username}/post/${post._id}`}
                  className="absolute top-0 left-0 right-0 bottom-2 opacity-0 hover:opacity-100 bg-black/50 rounded-md">
                  <div className="flex justify-center items-center gap-3 h-full">
                    <div className="flex gap-1 items-center text-white">
                      <FiMessageCircle
                        size={25}
                        title="Comment"
                        className="fill-white"
                      />
                      <p>{FormatNumber(totalComments)}</p>
                    </div>

                    <div className="flex gap-1 items-center text-white">
                      <FiHeart
                        size={25}
                        title="Like"
                        className="text-white fill-white"
                      />
                      <p>{FormatNumber(post.likes.length)}</p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}

          {hasNextPage && (
            <div ref={ref} className="flex justify-center items-center w-full">
              <BiLoaderAlt size={25} className="animate-spin" />
            </div>
          )}
        </section>
      ) : (
        <>
          {isLoading && <Loader />}
          {!isLoading && <p className="text-center">No media yet</p>}
        </>
      )}
    </>
  ) : (
    <section className="max-md:pb-14 pb-4 space-y-3">
      {posts.length > 0 ? (
        posts.map((post, i) => (
          <Adiv
            key={i}
            href={`/@${post.owner.username}/post/${post._id}`}
            className="border-b border-b-gray-300 dark:border-b-white/10 last:border-none">
            <PostCard variant="withflex" user={post.owner}>
              <PostCard.Header post={post} user={post.owner} userId={userId} />
              <PostCard.Body postImage={post.image}>
                {post.caption}
              </PostCard.Body>
              <PostCard.Footer
                user={post.owner}
                post={post}
                currentUser={username}
                userId={userId}
              />
            </PostCard>
          </Adiv>
        ))
      ) : (
        <>
          {isLoading && <Loader />}

          {type === "userPosts" && !isLoading && (
            <p className="text-center">No posts yet</p>
          )}

          {type === "likedPosts" && !isLoading && (
            <p className="text-center">No liked posts yet</p>
          )}
        </>
      )}

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
  );
};

export default PostSection;
