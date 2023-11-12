import useCookies from "@/hooks/useCookies";
import { getCurrentUser } from "@/utils/getData";
import CommentSection from "@/components/comment/CommentSection";
import useFetch from "@/hooks/useFetch";
import type { PostData } from "@/types";
import type { Metadata } from "next";
import PostCard from "@/components/post/PostCard";
import { notFound } from "next/navigation";
import BackButton from "@/components/ui/BackButton";

interface Props {
  params: {
    postId: string;
  };
}

export const generateMetadata = async ({
  params: { postId },
}: Props): Promise<Metadata> => {
  const { data: post } = await useFetch<PostData>(`/post/${postId}`);
  if (!post) return notFound();

  return {
    title: `@${post.owner.username}  ${
      post.caption && " · " + post.caption
    } · Netai`,
    description: post.caption,
    openGraph: {
      images: {
        url: post.image?.src || post.owner.picture!,
      },
      url: `https://netai.vercel.app/@${post.owner.username}/post/${postId}`,
      type: "article",
      title: `${post.owner.name ?? ""} (@${post.owner.username}) on Netai`,
      description: post.caption,
    },
  };
};

const PostPage = async ({ params: { postId } }: Props) => {
  const { userId } = useCookies();
  const { data: post } = await useFetch<PostData>(`/post/${postId}`);
  const { currentUser } = await getCurrentUser();

  return (
    <>
      <header className="flex gap-2 items-center sticky top-0 z-50 bg-white dark:bg-[#121212] pt-4 pb-2">
        <BackButton />
        <h1 className="text-xl md:text-2xl font-bold">Post</h1>
      </header>

      <article className="border-b border-b-gray-300 dark:border-b-white/10 w-full">
        <PostCard user={post.owner}>
          <PostCard.Header
            variant="noflex"
            post={post}
            user={post.owner}
            userId={userId}
          />
          <PostCard.Body postImage={post.image}>{post.caption}</PostCard.Body>
          <PostCard.Footer post={post} user={post.owner} userId={userId} />
        </PostCard>
      </article>

      <CommentSection
        userId={userId}
        postId={postId}
        currentUser={currentUser}
      />
    </>
  );
};

export default PostPage;
