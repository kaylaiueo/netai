"use server";

import { ResponseApi } from "@/types";

const useFetch = async <T>(
  url: string,
  options?: RequestInit
): Promise<ResponseApi<T>> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const data: ResponseApi<T> = await fetch(baseUrl + url, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    ...options,
  }).then((res) => res.json());

  return data;
};

export default useFetch;
