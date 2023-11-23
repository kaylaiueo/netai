"use client";

import { Logout, deleteAcc } from "@/actions";
import BackButton from "@/components/ui/BackButton";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { FiLogOut, FiUser } from "react-icons/fi";

const SettingsPage = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleLogout = () => {
    Logout();
    router.replace("/login");
  };

  const handleDeleteAcc = () => {
    const isConfirmed = confirm("Are you sure to delete your account?");

    if (isConfirmed) {
      startTransition(async () => {
        const { success, message } = await deleteAcc();

        if (success) {
          toast.remove("deleteAcc");
          toast.success(message);
          handleLogout();
        } else {
          toast.error("Failed to delete your account. Please try again later.");
        }
      });
    }
  };

  if (isPending) {
    toast.loading("This action will take a while, pls wait...", {
      id: "deleteAcc",
    });
  }

  return (
    <>
      <header className="flex gap-2 items-center mt-4">
        <BackButton />
        <h1 className="text-xl md:text-2xl font-bold">Settings</h1>
      </header>

      <ul>
        <li>
          <button
            onClick={handleLogout}
            className="flex gap-4 items-center py-2 rounded-md hover:bg-gray-200 dark:hover:bg-white/10 px-2 text-lg w-full text-red-600 dark:text-red-500">
            <FiLogOut size={25} title="Log out" />
            <span>Log out</span>
          </button>
        </li>
        <li>
          <button
            disabled={isPending}
            onClick={handleDeleteAcc}
            className="flex gap-4 items-center py-2 rounded-md hover:bg-gray-200 dark:hover:bg-white/10 px-2 text-lg w-full text-red-600 dark:text-red-500  disabled:opacity-50">
            <FiUser size={25} title="Log out" />
            <span>Delete account</span>
          </button>
        </li>
      </ul>
    </>
  );
};

export default SettingsPage;
