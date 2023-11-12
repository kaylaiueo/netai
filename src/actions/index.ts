"use server";

import useFetch from "@/hooks/useFetch";
import { CommentData } from "@/types";
import { cookies } from "next/headers";
import useCookies from "@/hooks/useCookies";

interface CommentResponse {
  data: CommentData;
  success: boolean;
}

interface RegisterResponse {
  success: boolean;
  message: string;
}

export const addComment = async (
  url: string,
  values: {
    ref: string;
    owner: string;
    reply?: string;
    commment?: string;
  }
) => {
  const response = await useFetch<CommentResponse>(url, {
    method: "POST",
    body: JSON.stringify(values),
    cache: "no-store",
  });

  return response;
};

export const Register = async (values: {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
}) => {
  const response = await useFetch<RegisterResponse>("/user/register", {
    method: "POST",
    body: JSON.stringify({
      name: values.name,
      username: values.username,
      password: values.password,
    }),
    cache: "no-store",
  });

  return response;
};

export const Login = async (values: { username: string; password: string }) => {
  const { success, data, message } = await useFetch<string>("/user/login", {
    method: "POST",
    body: JSON.stringify(values),
    cache: "no-store",
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

export const setCookies = (id: string) => {
  cookies().set("userId", id, { httpOnly: true, maxAge: 60 * 60 * 24 });
};
