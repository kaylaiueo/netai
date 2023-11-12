"use client";

import Adiv from "@/components/ui/Adiv";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import PostCard from "../post/PostCard";
import Image from "next/image";
import Link from "next/link";
import { FiHeart, FiMessageCircle } from "react-icons/fi";
import FormatNumber from "@/utils/FormatNumber";
import { BiLoaderAlt } from "react-icons/bi";
import type { CommentData } from "@/types";
import Loader from "../ui/Loader";
import { getAllPosts } from "@/utils/getInfiniteData";

interface Props {
  userId: string;
  imageOnly: boolean;
}

const PostSection = ({ userId, imageOnly }: Props) => {
  const { ref, inView } = useInView();
  const { posts, setSize, size, isReachingEnd, isLoading } = getAllPosts(
    userId,
    imageOnly!
  );

  useEffect(() => {
    if (inView) setSize(size + 1);
  }, [inView]);

  return imageOnly ? (
    <>
      <section className="gap-2 columns-2 max-md:pb-14">
        {posts.map((post, i) => {
          const totalReplies = post.comments
            .map((result: CommentData) => result.replies?.length)
            .reduce((a, b) => a + b, 0);
          const totalComments = post.comments.length + totalReplies;

          return (
            <div key={i} className="relative flex justify-center items-center">
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
      </section>

      {isLoading && <Loader />}

      {!isReachingEnd && posts.length > 0 && (
        <div ref={ref} className="flex justify-center items-center w-full">
          <BiLoaderAlt size={24} className="animate-spin" />
        </div>
      )}
    </>
  ) : (
    <section className="max-md:pb-14 space-y-3">
      {posts?.map((post, i) => (
        <Adiv
          key={i}
          href={`/@${post.owner.username}/post/${post._id}`}
          className="border-b border-b-gray-300 dark:border-b-white/10 last:border-none">
          <PostCard user={post.owner} variant="withflex">
            <PostCard.Header post={post} user={post.owner} userId={userId} />
            <PostCard.Body postImage={post.image}>{post.caption}</PostCard.Body>
            <PostCard.Footer user={post.owner} post={post} userId={userId} />
          </PostCard>
        </Adiv>
      ))}

      {isLoading && <Loader />}

      {!isReachingEnd && posts.length > 0 && (
        <div ref={ref} className="flex justify-center items-center w-full">
          <BiLoaderAlt size={25} className="animate-spin" />
        </div>
      )}
    </section>
  );
};

export default PostSection;
