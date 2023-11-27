"use client";

import useFetch from "@/hooks/useFetch";
import type { UserData } from "@/types";
import { ChangeEvent } from "react";
import { useState } from "react";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import UploadImg from "@/utils/UploadImg";
import ProfilePicture from "@/components/ui/ProfilePicture";
import DeleteImg from "@/utils/DeleteImg";
import { BiLoaderAlt } from "react-icons/bi";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type NewValue = {
  name?: string;
  bio?: string;
  link?: string;
  picture?: string;
  username?: string;
};

const EditProfileForm = ({
  currentUser,
  userId,
}: {
  currentUser: UserData;
  userId: string;
}) => {
  const router = useRouter();
  const [fileImage, setFileImage] = useState<FormData | null>(null);
  const [isPending, startTransition] = useTransition();
  const [previewImage, setPreviewImage] = useState<string>("");

  const getImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));

      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
      );
      setFileImage(formData);
    }
  };

  const onSubmit = (data: NewValue) => {
    startTransition(async () => {
      const response = fileImage !== null ? await UploadImg(fileImage) : null;

      const {
        data: prevImg,
        success,
        message,
      } = await useFetch<string>(`/user/edit/profile?id=${userId}`, {
        method: "PUT",
        body: JSON.stringify({
          name: data.name,
          bio: data.bio,
          link: data.link,
          username: data.username,
          picture: response?.src || currentUser.picture,
        }),
      });

      if (success) {
        router.replace(`/@${data.username}`);
        router.refresh();
        toast.success("Edit profile successfully");

        if (previewImage) {
          DeleteImg(prevImg);
        }
      } else {
        if (previewImage) {
          DeleteImg(response?.src || "");
        }

        toast.error(message);
      }
    });
  };

  const schema: ZodType<NewValue> = z.object({
    username: z
      .string()
      .min(4)
      .max(22)
      .regex(/^[a-z0-9]+$/, {
        message:
          "Username must not contain spaces/symbols, and must be in lowercase",
      }),
    bio: z.string().max(200).or(z.literal("")),
    link: z.string().url().or(z.literal("")),
    name: z.string().max(80).or(z.literal("")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewValue>({ resolver: zodResolver(schema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="w-full justify-center items-center flex">
        <label
          htmlFor="picture"
          className="w-max flex justify-center flex-col items-center mb-5 cursor-pointer">
          <ProfilePicture
            src={currentUser.picture}
            className="w-20 h-max"
            preview={previewImage}
          />
          <p className="text-blue-600 dark:text-blue-500">Edit picture</p>
          <input
            id="picture"
            onChange={getImage}
            type="file"
            accept="image/*"
            className="hidden"
          />
        </label>
      </div>

      <div>
        <label htmlFor="name" className="text-gray-500 dark:text-gray-400">
          Name
        </label>
        <input
          id="name"
          type="text"
          defaultValue={currentUser.name}
          maxLength={80}
          className="bg-gray-100 dark:bg-white/10 p-2 rounded-md outline-none w-full"
          {...register("name")}
        />

        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="username" className="text-gray-500 dark:text-gray-400">
          Username
        </label>
        <input
          id="username"
          type="text"
          minLength={4}
          maxLength={22}
          defaultValue={currentUser.username}
          className="bg-gray-100 dark:bg-white/10 p-2 rounded-md outline-none w-full"
          {...register("username")}
        />

        {errors.username && (
          <p className="text-sm text-red-500">{errors.username.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="link" className="text-gray-500 dark:text-gray-400">
          Add Link
        </label>
        <input
          id="link"
          type="url"
          pattern="https://.*"
          defaultValue={currentUser.link}
          placeholder="https://example.com"
          className="bg-gray-100 dark:bg-white/10 p-2 rounded-md outline-none w-full"
          {...register("link")}
        />
      </div>

      <div>
        <label htmlFor="bio" className="text-gray-500 dark:text-gray-400">
          Bio
        </label>
        <textarea
          id="bio"
          defaultValue={currentUser.bio}
          maxLength={200}
          className="bg-gray-100 dark:bg-white/10 p-2 rounded-md outline-none h-44 w-full"
          {...register("bio")}
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="flex gap-2 items-center bg-blue-600 text-white w-full justify-center py-1 rounded-full disabled:bg-blue-400">
        {isPending ? (
          <BiLoaderAlt size={22} className="animate-spin" />
        ) : (
          "Save"
        )}
      </button>
    </form>
  );
};

export default EditProfileForm;
