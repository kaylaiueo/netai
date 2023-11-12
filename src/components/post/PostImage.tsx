"use client";

import Adiv from "@/components/ui/Adiv";
import Image from "next/image";
import { useState } from "react";
import { FiX } from "react-icons/fi";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

const PostImage = (props: Props) => {
  const { src, alt, width, height, className } = props;
  const [isPreview, setIsPreview] = useState<boolean>(false);

  const handlePreview = () => {
    setIsPreview((prev) => !prev);
  };

  return (
    <Adiv>
      <Image
        draggable={false}
        alt={alt}
        onClick={handlePreview}
        src={src}
        width={width}
        height={height}
        className={className}
      />

      {isPreview && (
        <div
          onClick={handlePreview}
          className="w-full h-full flex justify-center items-center fixed top-0 left-0 z-50 bg-black">
          <Image
            alt={alt}
            src={src}
            width={width}
            height={height}
            className="h-full object-contain"
          />

          <button autoFocus>
            <FiX
              size={40}
              className="absolute top-4 left-4 p-1 bg-white/20 rounded-full text-gray-300"
            />
          </button>
        </div>
      )}
    </Adiv>
  );
};

export default PostImage;
