"use client";

import Adiv from "@/components/ui/Adiv";
import { getActivities } from "@/utils/getInfiniteData";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import ProfilePicture from "../ui/ProfilePicture";
import Link from "next/link";
import FormatDate from "@/utils/FormatDate";
import useTime from "@/hooks/useTime";
import FollowButton from "../ui/FollowButton";
import PostCard from "../post/PostCard";
import CommentCard from "../comment/CommentCard";
import { FaArrowsTurnRight } from "react-icons/fa6";
import { BiLoaderAlt } from "react-icons/bi";
import Loader from "../ui/Loader";

const ActivitySection = ({ userId }: { userId: string }) => {
  const { ref, inView } = useInView();
  const { activities, setSize, size, isReachingEnd, isLoading } = getActivities(
    userId,
    "forYou"
  );

  useEffect(() => {
    if (inView) setSize(size + 1);
  }, [inView]);

  return activities.length > 0 ? (
    <section className="max-md:pb-14 space-y-3">
      {activities.map((props, i) => {
        const {
          content,
          author,
          ref,
          message,
          refModel,
          contentModel,
          createdAt,
        } = props;

        return (
          <div
            key={i}
            className="border-b border-b-gray-300 dark:border-b-white/10 pb-3 last:border-none">
            {!contentModel && (
              <>
                <div className="flex gap-2 items-center justify-between">
                  <div className="flex gap-2 items-center justify-center">
                    <Adiv href={`/@${author.username}`} className="w-9">
                      <ProfilePicture
                        src={author.picture}
                        className="w-full h-max"
                      />
                    </Adiv>

                    <p className="flex-1">
                      <Link
                        href={`/@${author.username}`}
                        className="text-blue-600 dark:text-blue-500 hover:underline">{`@${author.username}`}</Link>
                      <span> {message}</span>
                      <span
                        title={FormatDate(createdAt)}
                        className="text-gray-500 text-sm">
                        {" · " + useTime(createdAt.toString())}
                      </span>
                    </p>
                  </div>

                  {message.includes("follow") && (
                    <FollowButton
                      className="px-4"
                      userId={userId}
                      username={author.username}
                      followers={author.followers}
                    />
                  )}
                </div>

                {ref && refModel === "posts" && (
                  <Adiv
                    href={`/@${ref.owner.username}/post/${ref._id}`}
                    className="mt-2 ml-12 p-2 space-y-2 border border-white/20 rounded-md">
                    <PostCard user={ref.owner}>
                      <PostCard.Header
                        avatarSize="sm"
                        variant="noflex"
                        disableMenu={true}
                        post={ref}
                        user={ref.owner}
                        userId={userId}
                      />
                      <PostCard.Body postImage={ref.image}>
                        {ref.caption}
                      </PostCard.Body>
                    </PostCard>
                  </Adiv>
                )}
              </>
            )}

            {(contentModel === "comments" || contentModel === "replies") && (
              <Adiv
                id={content._id}
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
          </div>
        );
      })}

      {!isReachingEnd && activities.length > 0 && (
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

export default ActivitySection;
