"use server";

import useFetch from "@/hooks/useFetch";
import type { ActivityData, CommentData, PostData, ReplyData } from "@/types";
import { cookies } from "next/headers";
import useCookies from "@/hooks/useCookies";

export const Register = async (values: {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
}) => {
  const response = await useFetch("/user/register", {
    method: "POST",
    body: JSON.stringify({
      name: values.name,
      username: values.username,
      password: values.password,
    }),
  });

  return response;
};

export const Login = async (values: { username: string; password: string }) => {
  const { success, data, message } = await useFetch<string>("/user/login", {
    method: "POST",
    body: JSON.stringify(values),
  });

  return {
    success,
    userId: data,
    message,
  };
};

export const Logout = () => {
  const { deleteCookies } = useCookies();
  deleteCookies();
};

export const deleteAcc = async () => {
  const { userId } = useCookies();
  const response = await useFetch(`/user/${userId}`, {
    method: "DELETE",
  });

  return response;
};

export const setCookies = (id: string) => {
  cookies().set("userId", id, { httpOnly: true, maxAge: 60 * 60 * 24 });
};

export const addComment = async (
  url: string,
  values: {
    ref: string;
    owner: string;
    reply?: string;
    commment?: string;
  }
) => {
  const response = await useFetch<CommentData>(url, {
    method: "POST",
    body: JSON.stringify(values),
  });

  return response;
};

export const addPost = async ({
  image,
  caption,
  userId,
}: {
  image: {
    src: string | undefined;
    width: number | undefined;
    height: number | undefined;
  };
  caption: string;
  userId: string;
}) => {
  const response = await useFetch("/post", {
    method: "POST",
    body: JSON.stringify({
      image,
      caption,
      owner: userId,
    }),
  });

  return response;
};

export const likePost = async ({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}) => {
  const response = await useFetch(`/post/like/${postId}`, {
    method: "PUT",
    body: JSON.stringify({ userId }),
  });

  return response;
};

export const getCommentInPost = async ({
  postId,
  pageParam,
}: {
  postId: string;
  pageParam: number;
}) => {
  const { data } = await useFetch<CommentData[]>(
    `/comment/${postId}?skip=${10 * pageParam}`
  );

  return data;
};

export const getRepliesInComment = async ({
  commentId,
  pageParam,
}: {
  commentId: string;
  pageParam: number;
}) => {
  const { data } = await useFetch<ReplyData[]>(
    `/reply/${commentId}?skip=${10 * pageParam}`
  );

  return data;
};

export const getActivities = async ({
  userId,
  pageParam,
  type,
}: {
  userId: string;
  pageParam: number;
  type: "mentions" | "forYou";
}) => {
  const { data } = await useFetch<ActivityData[]>(
    `/user/activities/${userId}?skip=${10 * pageParam}&type=${type}`
  );

  return data;
};

export const getUserPosts = async ({
  username,
  pageParam,
  type,
}: {
  username: string;
  pageParam: number;
  type: "userPosts" | "likedPosts" | "media";
}) => {
  const getUrl =
    type === "userPosts"
      ? `/post/owned?username=${username}&skip=${10 * pageParam}`
      : type === "likedPosts"
      ? `/post/liked?username=${username}&skip=${10 * pageParam}`
      : type === "media"
      ? `/post/media?username=${username}&skip=${10 * pageParam}`
      : "";

  const { data } = await useFetch<PostData[]>(getUrl);

  return data;
};

export const getAllPosts = async ({
  pageParam,
  userId,
  imageOnly,
}: {
  pageParam: number;
  userId: string;
  imageOnly: boolean;
}) => {
  const { data } = await useFetch<PostData[]>(
    `/post?skip=${10 * pageParam}&imageonly=${imageOnly}&id=${userId}`
  );

  return data;
};
