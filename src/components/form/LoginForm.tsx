"use client";

import { FormEvent, useRef, useState, useTransition } from "react";
import { Login, setCookies } from "@/actions";
import { useRouter } from "next/navigation";
import { BiLoaderAlt } from "react-icons/bi";

export type FormData = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputPassRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const values = {
      username: inputNameRef.current?.value!,
      password: inputPassRef.current?.value!,
    };

    startTransition(async () => {
      const response = await Login(values);
      if (!response.success) setErrorMessage(response.message);

      if (response.success) {
        setCookies(response.userId);
        router.replace("/");
      }
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 w-full max-sm:p-3 md:max-w-xs">
      <input
        ref={inputNameRef}
        type="text"
        maxLength={32}
        required
        autoFocus
        placeholder="Username"
        className="w-full rounded-md py-2 px-4 outline-none border border-gray-300 focus:border-black placeholder:text-gray-500 focus:placeholder:text-gray-400 dark:bg-transparent dark:border-white/20 dark:focus:border-white lowercase placeholder:capitalize"
      />
      <input
        ref={inputPassRef}
        type="password"
        required
        minLength={8}
        placeholder="Password"
        className="w-full rounded-md py-2 px-4 outline-none border border-gray-300 focus:border-black placeholder:text-gray-500 focus:placeholder:text-gray-400 dark:bg-transparent dark:border-white/20 dark:focus:border-white"
      />

      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 w-full rounded-md py-1 text-white disabled:bg-blue-400 flex items-center justify-center">
        {isPending ? (
          <BiLoaderAlt size={24} className="animate-spin" />
        ) : (
          "Sign in"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
