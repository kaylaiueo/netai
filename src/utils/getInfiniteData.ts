import type { ActivityData, CommentData, PostData, ReplyData } from "@/types";
import useSWRInfinite from "swr/infinite";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const fetcher = (url: string) =>
  fetch(baseUrl + url)
    .then((res) => res.json())
    .then((result) => result.data);

export const getPostByUsername = ({
  username,
  type,
}: {
  username: string;
  type?: "likedPosts" | "media" | "allPosts";
}) => {
  const getKey = (index: number, previousData: PostData[]) => {
    if (previousData && !previousData.length) return null;

    if (type === "allPosts") {
      return `/post/owned?username=${username}&skip=${10 * index}`;
    }

    if (type === "likedPosts") {
      return `/post/liked?username=${username}&skip=${10 * index}`;
    }

    if (type === "media") {
      return `/post/media?username=${username}&skip=${10 * index}`;
    }
  };

  const { data, size, setSize, error, isLoading, mutate } = useSWRInfinite<
    PostData[]
  >(getKey, fetcher, { revalidateFirstPage: false });

  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 10);
  const isDeletedOne = data?.length === 1;

  return {
    posts: data?.flat() ?? [],
    size,
    setSize,
    isDeletedOne,
    isLoading,
    mutate,
    isReachingEnd,
    isError: error,
  };
};

export const getAllPosts = (userId: string, imageOnly: boolean) => {
  const getKey = (index: number, previousData: PostData[]) => {
    if (previousData && !previousData.length) return null;

    return `/post?skip=${10 * index}&imageonly=${imageOnly}&id=${userId}`;
  };

  const { data, size, setSize, mutate, error, isLoading } = useSWRInfinite<
    PostData[]
  >(getKey, fetcher, { revalidateFirstPage: false });

  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 10);
  const isDeletedOne = data?.length === 1;

  return {
    posts: data?.flat() ?? [],
    size,
    setSize,
    isLoading,
    isDeletedOne,
    isReachingEnd,
    mutate,
    isError: error,
  };
};

export const getActivities = (userId: string, type: "mentions" | "forYou") => {
  const getKey = (index: number, previousData: PostData[]) => {
    if (previousData && !previousData.length) return null;

    return `/user/activities/${userId}?skip=${10 * index}&type=${type}`;
  };

  const { data, size, setSize, error, isLoading } = useSWRInfinite<
    ActivityData[]
  >(getKey, fetcher, { revalidateFirstPage: false });

  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 10);
  const isDeletedOne = data?.length === 1;

  return {
    activities: data?.flat() ?? [],
    size,
    setSize,
    isLoading,
    isDeletedOne,
    isReachingEnd,
    isError: error,
  };
};

export const getCommentInPost = (postId?: string) => {
  const getKey = (index: number, previousData: CommentData[]) => {
    if ((previousData && !previousData.length) || !postId) return null;

    return `/comment/${postId}?skip=${10 * index}`;
  };

  const { data, size, setSize, mutate, error } = useSWRInfinite<CommentData[]>(
    getKey,
    fetcher,
    { revalidateFirstPage: false }
  );

  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 10);
  const isDeletedOne = data?.length === 1;

  return {
    comments: data?.flat() ?? [],
    size,
    setSize,
    isDeletedOne,
    isReachingEnd,
    mutate,
    isError: error,
  };
};

export const getRepliedComment = (commentId?: string) => {
  const getKey = (index: number, previousData: ReplyData[]) => {
    if ((previousData && !previousData.length) || !commentId) return null;

    return `/reply/${commentId}?skip=${10 * index}`;
  };

  const { data, size, setSize, mutate, error } = useSWRInfinite<ReplyData[]>(
    getKey,
    fetcher,
    { revalidateFirstPage: false }
  );

  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 10);
  const isDeletedOne = data?.length === 1;

  return {
    replies: data?.flat() ?? [],
    size,
    setSize,
    mutate,
    isDeletedOne,
    isReachingEnd,
    isError: error,
  };
};
