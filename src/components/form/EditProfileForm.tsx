"use client";

import useFetch from "@/hooks/useFetch";
import type { UserData } from "@/types";
import { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import UploadImg from "@/utils/UploadImg";
import ProfilePicture from "@/components/ui/ProfilePicture";
import DeleteImg from "@/utils/DeleteImg";
import { BiLoaderAlt } from "react-icons/bi";
import toast from "react-hot-toast";

type NewValue = {
  name?: string;
  bio?: string;
  link?: string;
  picture?: string;
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
  const [values, setValues] = useState<NewValue>({
    name: currentUser.name,
    bio: currentUser.bio,
    link: currentUser.link,
    picture: currentUser.picture,
  });

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

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      const response = fileImage !== null ? await UploadImg(fileImage) : null;

      const { data: prevImg, success } = await useFetch<string>(
        `/user/edit/profile?id=${userId}`,
        {
          method: "PUT",
          cache: "no-store",
          body: JSON.stringify({
            ...values,
            picture: response?.src,
          }),
        }
      );

      if (success) {
        router.replace(`/@${currentUser.username}`);
        router.refresh();
        toast.success("Edit profile successfully");
        await DeleteImg(prevImg);
      } else {
        toast.error("Pls try again");
      }
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
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
        <label htmlFor="name" className="text-gray-500">
          Name
        </label>
        <input
          onChange={(e) => setValues({ ...values, name: e.target.value })}
          id="name"
          type="text"
          defaultValue={values.name}
          className="bg-gray-100 dark:bg-white/10 p-2 rounded-md outline-none w-full"
        />
      </div>

      <div>
        <label htmlFor="link" className="text-gray-500">
          Add Link
        </label>
        <input
          onChange={(e) => setValues({ ...values, link: e.target.value })}
          id="link"
          type="url"
          pattern="https://.*"
          defaultValue={values.link}
          placeholder="https://example.com"
          className="bg-gray-100 dark:bg-white/10 p-2 rounded-md outline-none w-full"
        />
      </div>

      <div>
        <label htmlFor="bio" className="text-gray-500">
          Bio
        </label>
        <textarea
          id="bio"
          defaultValue={values.bio}
          maxLength={150}
          onChange={(e) => setValues({ ...values, bio: e.target.value })}
          className="bg-gray-100 dark:bg-white/10 p-2 rounded-md outline-none h-44 w-full"
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
