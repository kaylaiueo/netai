"use client";

import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="hover:bg-gray-200 dark:hover:bg-white/10 rounded-full p-1">
      <FiArrowLeft size={22} title="Back" />
    </button>
  );
};

export default BackButton;
