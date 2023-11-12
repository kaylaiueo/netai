"use server";

import { cookies } from "next/headers";

const useCookies = () => {
  const userId: string = cookies().get("userId")?.value!;
  const deleteCookies = () => cookies().delete("userId");

  return {
    userId,
    deleteCookies,
  };
};

export default useCookies;
