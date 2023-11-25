"use client";

import { useTransition } from "react";
import { Login, setCookies } from "@/actions";
import { useRouter } from "next/navigation";
import { BiLoaderAlt } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

export type FormData = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: FormData) => {
    startTransition(async () => {
      const { success, message, userId } = await Login(data);
      if (!success) toast.error(message);

      if (success) {
        setCookies(userId);
        router.replace("/");
      }
    });
  };

  const schema: ZodType<FormData> = z.object({
    username: z
      .string()
      .min(4)
      .max(22)
      .regex(/^[a-z0-9]+$/, {
        message:
          "Username must not contain spaces/symbols, and must be in lowercase",
      }),
    password: z.string().min(8),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 w-full max-sm:p-3 md:max-w-xs">
      <div className="space-y-2">
        <input
          type="text"
          minLength={4}
          maxLength={22}
          required
          autoFocus
          placeholder="Username"
          className="w-full rounded-md py-2 px-4 outline-none border border-gray-300 focus:border-black placeholder:text-gray-500 focus:placeholder:text-gray-400 dark:bg-transparent dark:border-white/20 dark:focus:border-white placeholder:capitalize"
          {...register("username")}
        />

        {errors.username && (
          <p className="text-sm text-red-500">{errors.username.message}</p>
        )}
      </div>

      <input
        type="password"
        required
        minLength={8}
        placeholder="Password"
        className="w-full rounded-md py-2 px-4 outline-none border border-gray-300 focus:border-black placeholder:text-gray-500 focus:placeholder:text-gray-400 dark:bg-transparent dark:border-white/20 dark:focus:border-white"
        {...register("password")}
      />

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
