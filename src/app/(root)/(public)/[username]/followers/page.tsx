import Adiv from "@/components/ui/Adiv";
import BackButton from "@/components/ui/BackButton";
import FollowButton from "@/components/ui/FollowButton";
import ProfilePicture from "@/components/ui/ProfilePicture";
import useCookies from "@/hooks/useCookies";
import type { UserData } from "@/types";
import { getUserByUsername } from "@/utils/getData";
import Link from "next/link";
import { redirect } from "next/navigation";
import { TbCircleCheckFilled } from "react-icons/tb";

interface Params {
  params: {
    username: string;
  };
}

const FollowersPage = async ({ params: { username } }: Params) => {
  const { userId } = useCookies();
  if (!userId) redirect("/login");

  const { user } = await getUserByUsername(username);

  return (
    <>
      <header className="flex gap-2 items-center sticky top-0 z-50 bg-white dark:bg-[#121212] pt-4 pb-2">
        <BackButton />
        <h1 className="text-xl md:text-2xl font-bold">Followers</h1>
      </header>

      {user.followers.length > 0 ? (
        <section className="space-y-3">
          {user.followers.map((user: UserData, i) => (
            <Adiv
              key={i}
              href={`/@${user.username}`}
              className="flex justify-between items-center">
              <Link
                href={`/@${user.username}`}
                className="flex gap-2 items-center">
                <ProfilePicture src={user.picture} className="w-10 h-max" />

                <div>
                  <div className="flex gap-1 items-center">
                    <p className="hover:underline">{user.username}</p>
                    {user.verify && (
                      <TbCircleCheckFilled
                        title="Verified"
                        className="text-blue-500"
                        size={19}
                      />
                    )}
                  </div>
                  {user.name && <p className="text-gray-500">{user.name}</p>}
                </div>
              </Link>

              {user._id !== userId && (
                <FollowButton
                  className="px-4"
                  userId={userId}
                  username={user.username}
                  followers={user.followers}
                />
              )}
            </Adiv>
          ))}
        </section>
      ) : (
        <p className="flex justify-center items-center max-md:h-screen h-full">
          No users found
        </p>
      )}
    </>
  );
};

export default FollowersPage;
