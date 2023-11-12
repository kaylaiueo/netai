"use client";

import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import { FaUpload, FaX } from "react-icons/fa6";
import { TbPhotoPlus } from "react-icons/tb";
import UploadImg from "@/utils/UploadImg";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import { getPostByUsername } from "@/utils/getInfiniteData";
import toast from "react-hot-toast";

interface Props {
  userId: string;
  username: string;
}

const CreatePostForm = ({ userId, username }: Props) => {
  const router = useRouter();
  const [caption, setCaption] = useState<string>("");
  const [fileImage, setFileImage] = useState<FormData | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const { mutate } = getPostByUsername({ username, type: "allPosts" });

  const getFile = (e: ChangeEvent<HTMLInputElement>) => {
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

      const image = {
        src: response?.src,
        width: response?.width,
        height: response?.height,
      };

      const { success, message } = await useFetch("/post", {
        method: "POST",
        cache: "no-store",
        body: JSON.stringify({
          image,
          caption,
          owner: userId,
        }),
      });

      if (success) {
        toast.success(message);
      } else {
        toast.error("Pls try again");
      }

      mutate();
      router.push(`/@${username}`);
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3 flex-1">
      <textarea
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Write a caption..."
        maxLength={500}
        className="bg-gray-100 dark:bg-white/10 p-2 rounded-md outline-none h-44 w-full"
      />

      {!previewImage && (
        <label
          htmlFor="file"
          className="flex gap-2 items-center w-max cursor-pointer">
          <TbPhotoPlus size={27} title="Upload Image" />
          <input
            id="file"
            className="hidden"
            type="file"
            accept="image/*"
            onChange={getFile}
          />
        </label>
      )}

      {previewImage && (
        <div className="relative w-fit">
          <button
            onClick={() => {
              setPreviewImage("");
              setFileImage(null);
            }}
            className="absolute -top-2 -right-2 p-2 bg-black text-white rounded-full">
            <FaX title="Delete Image" />
          </button>
          <Image
            src={previewImage}
            alt="Post"
            width={600}
            height={600}
            className="w-auto h-auto rounded-md"
          />
        </div>
      )}

      {(caption || previewImage) && (
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="bg-blue-500 text-white py-2 px-4 rounded-md flex gap-2 items-center disabled:bg-blue-300 dark:disabled:bg-blue-400 disabled:cursor-not-allowed">
            <FaUpload title="Upload" /> {isPending ? "Uploading..." : "Upload"}
          </button>
        </div>
      )}
    </form>
  );
};

export default CreatePostForm;
