import BackButton from "@/components/ui/BackButton";
import CommentCard from "@/components/comment/CommentCard";
import PostCard from "@/components/post/PostCard";
import ReplySection from "@/components/comment/ReplySection";
import useCookies from "@/hooks/useCookies";
import useFetch from "@/hooks/useFetch";
import type { CommentData, PostData } from "@/types";
import Adiv from "@/components/ui/Adiv";
import FormatDate from "@/utils/FormatDate";
import FormatNumber from "@/utils/FormatNumber";
import { getCurrentUser } from "@/utils/getData";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface Params {
  params: {
    commentId: string;
  };
  searchParams: { id: string };
}

export const generateMetadata = async ({
  params: { commentId },
}: {
  params: { commentId: string };
}): Promise<Metadata> => {
  const { data: comment } = await useFetch<CommentData>(
    `/comment?id=${commentId}`
  );
  if (!comment) return notFound();

  return {
    title: `@${comment.owner.username}  ${
      comment.text && " · " + comment.text
    } · Netai`,
    description: comment.text,
    openGraph: {
      images: {
        url: comment.owner.picture!,
      },
      url: `/@${comment.owner.username}/comment/${commentId}`,
      type: "article",
      title: `${comment.owner.name ?? ""} (@${
        comment.owner.username
      }) on Netai`,
      description: comment.text,
    },
  };
};

const CommentPage = async ({
  params: { commentId },
  searchParams: { id },
}: Params) => {
  const { userId } = useCookies();
  const { data: comment } = await useFetch<CommentData>(
    `/comment?id=${commentId}`
  );
  const { currentUser } = await getCurrentUser();
  const post = comment.ref as PostData;

  return (
    <>
      <header className="flex gap-2 items-center sticky top-0 z-50 bg-white dark:bg-[#121212] pt-4 pb-2">
        <BackButton />
        <h1 className="text-xl md:text-2xl font-bold">Comment</h1>
      </header>

      <article className="relative">
        <Adiv href={`/@${post.owner.username}/post/${post._id}`}>
          <PostCard user={post.owner} variant="withflex">
            <PostCard.Header post={post} user={post.owner} userId={userId} />
            <PostCard.Body postImage={post.image}>{post.caption}</PostCard.Body>
            <PostCard.Footer user={post.owner} post={post} userId={userId} />
          </PostCard>
        </Adiv>
        <div className="bg-gray-300 dark:bg-white/30 w-0.5 absolute top-11 left-4 -bottom-1 rounded-full" />
      </article>

      <article className="border-b border-b-gray-300 dark:border-b-white/10 w-full">
        <CommentCard owner={comment.owner} optimistic={comment.optimistic}>
          <CommentCard.Header
            disableDate={true}
            variant="noflex"
            commentId={comment._id}
            owner={comment.owner}
            createdAt={comment.createdAt}
            userId={userId}
            type="comment"
          />

          <CommentCard.Body>{comment.text}</CommentCard.Body>

          <div className="text-gray-500 dark:text-gray-400 flex gap-2 items-center text-sm mb-2 max-md:text-[12.2px]">
            {comment.replies.length > 0 && (
              <>
                <div className="flex gap-1 items-center">
                  <p className="text-black dark:text-white font-semibold">
                    {FormatNumber(comment.replies.length)}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    {comment.replies.length > 1 ? "Replies" : "Reply"}
                  </p>
                </div>
                <span>·</span>
              </>
            )}

            <time dateTime={comment.createdAt.toString()}>
              {FormatDate(comment.createdAt)}
            </time>
          </div>
        </CommentCard>
      </article>

      <ReplySection
        commentId={commentId}
        userId={userId}
        query={id}
        currentUser={currentUser}
      />
    </>
  );
};

export default CommentPage;
