"use server";

import useCookies from "@/hooks/useCookies";
import useFetch from "@/hooks/useFetch";
import type { UserData } from "@/types";

export const getCurrentUser = async () => {
  const { userId } = useCookies();
  const { data } = await useFetch<UserData>(`/user/${userId}`);
  return { currentUser: data };
};

export const getUserByUsername = async (username: string) => {
  const { data } = await useFetch<UserData>(`/user/name/${username.slice(3)}`);
  return { user: data };
};
