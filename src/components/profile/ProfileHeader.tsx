import FollowButton from "@/components/ui/FollowButton";
import ProfilePicture from "@/components/ui/ProfilePicture";
import type { UserData } from "@/types";
import Linkify from "linkify-react";
import Link from "next/link";
import { FiHeart, FiLink } from "react-icons/fi";
import { BsImages, BsLayoutTextWindow, BsPencilFill } from "react-icons/bs";
import { TbCircleCheckFilled } from "react-icons/tb";
import FormatNumber from "@/utils/FormatNumber";
import RenderLink from "@/components/ui/RenderLink";
import BackButton from "../ui/BackButton";
import { BsGear } from "react-icons/bs";

interface Props {
  user: UserData;
  children: React.ReactNode;
  userId: string;
  type?: "likes" | "media";
}

const ProfileHeader = ({ user, children, userId, type }: Props) => {
  const followers = user.followers.map((result: UserData) => result._id);

  return (
    <>
      <header className="flex gap-2 items-center justify-between mt-4">
        <div className="flex gap-2 items-center">
          <BackButton />
          <h1 className="text-xl md:text-2xl font-bold">Profile</h1>
        </div>

        {userId === user._id && (
          <Link href={`/@${user.username}/settings`} className="p-1">
            <BsGear size={22} />
          </Link>
        )}
      </header>

      <section className="space-y-2">
        <div className="flex justify-between items-center gap-2 overflow-hidden">
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-500 dark:text-gray-400">
              {"@" + user.username}
            </p>
          </div>

          <div className="relative">
            <div className="w-20">
              <ProfilePicture src={user.picture} className="w-20 h-max" />
            </div>

            {user.verify && (
              <div className="absolute bottom-0 -left-1 bg-white dark:bg-[#121212] rounded-full p-0.5">
                <TbCircleCheckFilled
                  className="text-blue-500"
                  title="Verified"
                  size={22}
                />
              </div>
            )}
          </div>
        </div>

        {user.bio && (
          <p className="whitespace-pre-line">
            <Linkify
              as="span"
              options={{
                render: RenderLink,
                defaultProtocol: "https",
                formatHref: {
                  mention: (href) => "/@" + href.slice(1),
                },
              }}>
              {user.bio}
            </Linkify>
          </p>
        )}

        {user.link && (
          <Link
            href={user.link}
            target="_blank"
            className="text-blue-600 dark:text-blue-500 hover:underline w-max flex gap-1 items-center">
            <FiLink size={16} className="text-black dark:text-white" />
            {user.link}
          </Link>
        )}

        <div className="flex gap-5 items-center justify-between">
          <div className="flex gap-2 items-center max-md:text-sm">
            {user.following?.length > 0 && (
              <Link
                href={`/@${user.username}/following`}
                className="hover:underline">
                <span className="font-semibold">
                  {FormatNumber(user.following.length)}{" "}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  Following
                </span>
              </Link>
            )}

            {user.followers?.length > 0 && user.following?.length > 0 && (
              <span>·</span>
            )}

            {user.followers?.length > 0 && (
              <Link
                href={`/@${user.username}/followers`}
                className="hover:underline">
                <span className="font-semibold">
                  {FormatNumber(user.followers.length)}{" "}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  Followers
                </span>
              </Link>
            )}

            {(user.followers?.length > 0 || user.following?.length > 0) &&
              user.posts.length > 0 && <span>·</span>}

            {user.posts.length > 0 && (
              <p>
                <span className="font-semibold">{user.posts.length} </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  posts
                </span>
              </p>
            )}
          </div>

          {user._id === userId && (
            <Link href={`/@${user.username}/edit`}>
              <BsPencilFill title="Edit Profile" size={20} />
            </Link>
          )}
        </div>

        {userId && userId !== user._id && (
          <FollowButton
            className="w-full"
            userId={userId}
            username={user.username}
            followers={followers}
          />
        )}
      </section>

      <nav className="w-full sticky top-0 bg-white dark:bg-[#121212] z-40">
        <ul className="flex items-center w-full justify-evenly text-center">
          <li
            className={`w-full hover:bg-gray-200 dark:hover:bg-white/10 ${
              !type
                ? "border-b border-b-black dark:border-b-white"
                : "border-b border-b-gray-200 dark:border-b-white/10"
            }`}>
            <Link
              replace
              href={`/@${user.username}`}
              className="flex gap-2 items-center justify-center py-4">
              <BsLayoutTextWindow size={18} title="Posts" />
            </Link>
          </li>

          <li
            className={`w-full hover:bg-gray-200 dark:hover:bg-white/10 ${
              type === "likes"
                ? "border-b border-b-black dark:border-b-white"
                : "border-b border-b-gray-200 dark:border-b-white/10"
            }`}>
            <Link
              replace
              href={`/@${user.username}/likes`}
              className="flex gap-2 items-center justify-center py-4">
              <FiHeart size={20} title="Likes" />
            </Link>
          </li>

          <li
            className={`w-full hover:bg-gray-200 dark:hover:bg-white/10 ${
              type === "media"
                ? "border-b border-b-black dark:border-b-white"
                : "border-b border-b-gray-200 dark:border-b-white/10"
            }`}>
            <Link
              replace
              href={`/@${user.username}/media`}
              className="flex gap-2 items-center justify-center py-4">
              <BsImages size={20} title="Media" />
            </Link>
          </li>
        </ul>
      </nav>

      {children}
    </>
  );
};

export default ProfileHeader;
