"use client";

import type { UserData } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProfilePicture from "../ui/ProfilePicture";
import { FiHeart, FiHome, FiPlusSquare } from "react-icons/fi";

const BottomBar = ({ user }: { user: UserData }) => {
  const pathname = usePathname();

  const findActivityToday = user.activities?.filter((activity) => {
    const currentDate = new Date().getDate();

    return new Date(activity.createdAt).getDate() === currentDate;
  });

  return (
    <footer
      className={`w-full py-2 bottom-0 left-0 right-0  flex justify-evenly items-center bg-white dark:bg-[#121212] z-40 border-t border-t-white/10
    ${
      pathname.includes("/post") || pathname.includes("/comment")
        ? "hidden"
        : "fixed md:hidden"
    }
    `}>
      <Link
        href="/"
        className={`flex gap-4 items-center py-2 rounded-md hover:bg-gray-200 dark:hover:bg-white/10 px-5 text-lg ${
          pathname === "/" && "bg-gray-200 dark:bg-white/10"
        }`}>
        <FiHome size={25} title="Home" />
        <p className="max-xl:hidden">Home</p>
      </Link>

      <Link
        href="/create-post"
        className={`flex gap-4 items-center py-2 rounded-md hover:bg-gray-200 dark:hover:bg-white/10 px-5 text-lg ${
          pathname === "/create-post" && "bg-gray-200 dark:bg-white/10"
        }`}>
        <FiPlusSquare size={25} title="Create Post" />
        <p className="max-xl:hidden">Create Post</p>
      </Link>

      <Link
        href="/activity"
        className={`flex gap-4 items-center py-2 rounded-md hover:bg-gray-200 dark:hover:bg-white/10 px-5 text-lg ${
          pathname === "/activity" && "bg-gray-200 dark:bg-white/10"
        }`}>
        <div className="relative">
          <FiHeart size={25} title="Activity" />
          {findActivityToday?.length! > 0 && (
            <div className="absolute top-0 left-5 w-2 h-2 bg-red-500 rounded-full z-50" />
          )}
        </div>
        <p className="max-xl:hidden">Activity</p>
      </Link>

      <Link
        href={`/@${user.username}`}
        className={`flex gap-4 items-center py-2 rounded-md hover:bg-gray-200 dark:hover:bg-white/10 px-5 text-lg ${
          pathname.includes(user.username) && "bg-gray-200 dark:bg-white/10"
        }`}>
        <ProfilePicture src={user.picture} className="w-7" />
      </Link>
    </footer>
  );
};

export default BottomBar;
