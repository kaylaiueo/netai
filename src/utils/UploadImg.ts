"use server";

type Response = {
  secure_url: string;
  width: number;
  height: number;
};

const UploadImg = async (fileImage: FormData | null) => {
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`;
  const { secure_url, width, height }: Response = await fetch(url, {
    method: "POST",
    cache: "no-store",
    body: fileImage,
  }).then((res) => res.json());

  return { src: secure_url, width, height };
};

export default UploadImg;
