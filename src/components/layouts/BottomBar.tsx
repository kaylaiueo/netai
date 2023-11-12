"use client";

import type { UserData } from "@/types";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import ProfilePicture from "../ui/ProfilePicture";
import { Logout } from "@/actions";
import {
  FiHeart,
  FiHome,
  FiLogOut,
  FiPlusSquare,
  FiUser,
} from "react-icons/fi";

const BottomBar = ({ user }: { user: UserData }) => {
  const router = useRouter();
  const [_, startTransition] = useTransition();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = () => {
    startTransition(() => {
      Logout();
      router.replace("/login");
    });
  };

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
        <FiHeart size={25} title="Activity" />
        <p className="max-xl:hidden">Activity</p>
      </Link>

      {isOpen && (
        <div
          onClick={handleMenu}
          className="w-full h-screen flex justify-center items-center fixed top-0 left-0 z-50 bg-black/50"
        />
      )}

      <div
        onClick={handleMenu}
        className={
          isOpen
            ? "fixed bottom-0 left-0 right-0 z-50 dark:bg-[#121212] bg-white py-5 px-2 rounded-t-md shadow shadow-black dark:shadow-white"
            : "hidden"
        }>
        <Link
          href={`/@${user.username}`}
          className="flex gap-4 items-center py-2 rounded-md hover:bg-gray-200 dark:hover:bg-white/10 px-3 text-lg w-full">
          <FiUser size={25} title="Profile" />
          <span>Profile</span>
        </Link>

        <div className="w-full h-[1px] bg-gray-200 dark:bg-white/10" />

        <button
          onClick={handleLogout}
          className="flex gap-4 items-center py-2 rounded-md hover:bg-gray-200 dark:hover:bg-white/10 px-3 text-lg w-full">
          <FiLogOut size={25} title="Log out" />
          <span>Log out</span>
        </button>
      </div>

      <button
        type="button"
        onClick={handleMenu}
        className={`flex gap-4 items-center py-2 rounded-md hover:bg-gray-200 dark:hover:bg-white/10 px-5 text-lg ${
          pathname.includes(user.username) && "bg-gray-200 dark:bg-white/10"
        }`}>
        <ProfilePicture src={user.picture} className="w-7" />
      </button>
    </footer>
  );
};

export default BottomBar;
