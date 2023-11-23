"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { UserData } from "@/types";
import ProfilePicture from "@/components/ui/ProfilePicture";
import { FiHeart, FiHome, FiPlusSquare } from "react-icons/fi";

const LeftSideBar = ({ user }: { user: UserData }) => {
  const pathname = usePathname();

  const findActivityToday = user.activities?.filter((activity) => {
    const currentDate = new Date().getDate();

    return new Date(activity.createdAt).getDate() === currentDate;
  });

  return (
    <aside className="hidden sticky top-0 p-5 w-full max-w-xs max-xl:w-max h-screen md:flex justify-between flex-col">
      <div className="space-y-5">
        <div className="w-14 ml-2">
          <Image
            src="/logo.png"
            alt="Netai"
            title="Netai"
            width={100}
            height={100}
          />
        </div>

        <Link
          href="/"
          className={`flex gap-4 items-center py-2 rounded-md hover:bg-gray-200 dark:hover:bg-white/10 px-5 text-lg ${
            pathname === "/" && "bg-gray-200 dark:bg-white/10"
          }`}>
          <FiHome size={25} title="Home" />
          <p className="max-xl:hidden">Home</p>
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
          href="/create-post"
          className={`flex gap-4 items-center py-2 rounded-md hover:bg-gray-200 dark:hover:bg-white/10 px-5 text-lg ${
            pathname === "/create-post" && "bg-gray-200 dark:bg-white/10"
          }`}>
          <FiPlusSquare size={25} title="Create Post" />
          <p className="max-xl:hidden">Create Post</p>
        </Link>

        <Link
          href={`/@${user.username}`}
          className={`flex gap-3.5 items-center py-2 rounded-md hover:bg-gray-200 dark:hover:bg-white/10 px-5 text-lg ${
            pathname === `/@${user.username}` && "bg-gray-200 dark:bg-white/10"
          }`}>
          <ProfilePicture src={user.picture} className="w-7" />
          <p className="max-xl:hidden">Profile</p>
        </Link>
      </div>
    </aside>
  );
};

export default LeftSideBar;
