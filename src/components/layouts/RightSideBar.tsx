import Link from "next/link";
import useCookies from "@/hooks/useCookies";
import FollowButton from "../ui/FollowButton";
import useFetch from "@/hooks/useFetch";
import type { UserData } from "@/types";
import ProfilePicture from "../ui/ProfilePicture";
import { TbCircleCheckFilled } from "react-icons/tb";

const RightSideBar = async () => {
  const { userId } = useCookies();
  const { data } = await useFetch<UserData[]>(`/user/suggested?id=${userId}`);

  return (
    <aside className="hidden lg:flex sticky top-0 p-5 h-screen w-full max-w-sm flex-col gap-5">
      <div className="space-y-5 border border-gray-300 dark:border-white/10 p-4 rounded-md">
        <h1 className="text-lg font-bold">Suggested Accounts</h1>

        {data.map((user) => (
          <div key={user._id} className="flex justify-between items-center">
            <Link
              draggable={false}
              href={`/@${user.username}`}
              className="flex gap-2 items-center">
              <ProfilePicture src={user.picture} className="w-10 h-max" />

              <div>
                <div className="flex gap-1 items-center">
                  <p className="select-text">
                    {user.username.length > 13
                      ? user.username.substring(0, 12) + "..."
                      : user.username}
                  </p>
                  {user.verify && (
                    <TbCircleCheckFilled
                      title="Verified"
                      className="text-blue-500"
                      size={19}
                    />
                  )}
                </div>

                {user.name && (
                  <p className="text-gray-500 dark:text-gray-400">
                    {user.name.length > 15
                      ? user.name.substring(0, 15) + "..."
                      : user.name}
                  </p>
                )}
              </div>
            </Link>

            <FollowButton
              className="px-4"
              userId={userId}
              username={user.username}
              followers={user.followers}
            />
          </div>
        ))}
      </div>
    </aside>
  );
};

export default RightSideBar;
