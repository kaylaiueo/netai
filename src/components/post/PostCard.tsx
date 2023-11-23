import type { PostData, UserData, CommentData } from "@/types";
import ProfilePicture from "../ui/ProfilePicture";
import FormatDate from "@/utils/FormatDate";
import useTime from "@/hooks/useTime";
import ThreeDots from "../ui/ThreeDots";
import Linkify from "linkify-react";
import PostImage from "./PostImage";
import { FiMessageCircle } from "react-icons/fi";
import Link from "next/link";
import LikeButton from "../ui/LikeButton";
import FormatNumber from "@/utils/FormatNumber";
import Adiv from "@/components/ui/Adiv";
import RenderLink from "@/components/ui/RenderLink";
import { TbCircleCheckFilled } from "react-icons/tb";
import "linkify-plugin-mention";

const PostCard = ({
  user,
  children,
  variant,
}: {
  user: UserData;
  children: React.ReactNode;
  variant?: "withflex";
}) => {
  return (
    <div className="flex gap-2 w-full">
      {variant === "withflex" && (
        <Adiv className="h-fit w-9">
          <Link draggable={false} href={`/@${user.username}`}>
            <ProfilePicture src={user.picture} className="w-full h-max" />
          </Link>
        </Adiv>
      )}

      <div className="w-full flex-1">{children}</div>
    </div>
  );
};

const Header = ({
  user,
  post,
  userId,
  disableMenu,
  variant,
  avatarSize,
}: {
  user: UserData;
  post: PostData;
  userId: string;
  disableMenu?: boolean;
  variant?: "noflex";
  avatarSize?: "sm";
}) => {
  return (
    <div className="flex justify-between items-center pb-0.5">
      <Adiv>
        <Link href={`/@${user.username}`} className="flex gap-1 items-center">
          {variant === "noflex" && (
            <ProfilePicture
              src={user.picture}
              className={`${avatarSize === "sm" ? "w-8" : "w-9"} h-max mr-1`}
            />
          )}
          <p className="font-semibold hover:underline">{user.username}</p>
          {user.verify && (
            <TbCircleCheckFilled
              title="Verified"
              className="text-blue-500"
              size={19}
            />
          )}
        </Link>
      </Adiv>

      <Adiv className="flex gap-2 items-center">
        <time
          dateTime={post.createdAt.toString()}
          title={FormatDate(post.createdAt)}
          className="text-sm text-gray-500 dark:text-gray-400 hover:underline">
          {useTime(post.createdAt.toString())}
        </time>

        {!disableMenu && (
          <ThreeDots
            type="post"
            username={user.username}
            id={post._id}
            image={post.image?.src}
            owner={post.owner._id}
            userId={userId}
          />
        )}
      </Adiv>
    </div>
  );
};

const Body = ({
  postImage,
  children,
}: {
  postImage: PostData["image"];
  children?: React.ReactNode;
}) => {
  return (
    <div className="space-y-2 w-fit">
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
          {children}
        </Linkify>
      </p>

      {postImage?.src && (
        <PostImage
          width={postImage.width}
          height={postImage.height}
          src={postImage.src}
          alt="Post"
          className="rounded-md"
        />
      )}
    </div>
  );
};

const Footer = ({
  repliesLength,
  post,
  userId,
  user,
  currentUser,
}: {
  user: UserData;
  repliesLength?: number;
  post: PostData;
  userId: string;
  currentUser?: string;
}) => {
  const totalReplies = repliesLength
    ? repliesLength
    : post.comments
        .map((result: CommentData) => result.replies?.length)
        .reduce((a, b) => a + b, 0);
  const totalComments = post.comments.length + totalReplies;

  return (
    <div className="flex justify-start items-center gap-4 my-2">
      <Link
        href={`/@${user.username}/post/${post._id}`}
        className="flex gap-2 items-center text-gray-500 dark:text-gray-400 hover:text-blue-500 text-sm">
        <FiMessageCircle size={23} title="Comment" />
        {totalComments > 0 && <p>{FormatNumber(totalComments)}</p>}
      </Link>

      <LikeButton userId={userId} postId={post._id} likes={post.likes} />
    </div>
  );
};

PostCard.Header = Header;
PostCard.Body = Body;
PostCard.Footer = Footer;

export default PostCard;
