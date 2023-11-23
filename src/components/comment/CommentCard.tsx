import ProfilePicture from "@/components/ui/ProfilePicture";
import ReplyButton from "@/components/ui/ReplyButton";
import ThreeDots from "@/components/ui/ThreeDots";
import useTime from "@/hooks/useTime";
import FormatDate from "@/utils/FormatDate";
import Linkify from "linkify-react";
import Link from "next/link";
import type { UserData } from "@/types";
import { BiLoaderAlt } from "react-icons/bi";
import Adiv from "@/components/ui/Adiv";
import RenderLink from "@/components/ui/RenderLink";
import { TbCircleCheckFilled } from "react-icons/tb";
import "linkify-plugin-mention";

const CommentCard = ({
  owner,
  optimistic,
  children,
  variant,
}: {
  owner: UserData;
  variant?: "withflex";
  optimistic?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div className={`flex gap-2 w-full ${optimistic ? "opacity-50" : ""}`}>
      {variant === "withflex" && (
        <Adiv className="h-fit w-9">
          <Link href={`/@${owner.username}`}>
            <ProfilePicture src={owner.picture} className="w-full h-max" />
          </Link>
        </Adiv>
      )}

      <div className="w-full flex-1">{children}</div>
    </div>
  );
};

const Header = ({
  owner,
  createdAt,
  commentId,
  userId,
  disableMenu,
  type,
  variant,
  disableDate,
  replyId,
}: {
  owner: UserData;
  variant?: "noflex";
  commentId?: string;
  replyId?: string;
  createdAt: Date;
  userId: string;
  type?: "comment" | "reply";
  disableMenu?: boolean;
  disableDate?: boolean;
}) => {
  return (
    <div className="flex justify-between items-center pb-0.5">
      <Adiv>
        <Link href={`/@${owner.username}`} className="flex gap-1 items-center">
          {variant === "noflex" && (
            <ProfilePicture src={owner.picture} className="w-9 h-max mr-1" />
          )}
          <p className="font-semibold hover:underline">{owner.username}</p>
          {owner.verify && (
            <TbCircleCheckFilled
              title="Verified"
              className="text-blue-500"
              size={19}
            />
          )}
        </Link>
      </Adiv>

      <Adiv className="flex gap-2 items-center">
        {!disableDate && (
          <time
            title={FormatDate(createdAt)}
            dateTime={createdAt.toString()}
            className="text-sm text-gray-500 dark:text-gray-400 hover:underline">
            {useTime(createdAt.toString())}
          </time>
        )}

        {(owner._id === userId || type === "comment") && !disableMenu && (
          <ThreeDots
            type={type!}
            id={replyId || commentId || ""}
            username={owner.username}
            owner={owner._id}
            userId={userId}
          />
        )}
      </Adiv>
    </div>
  );
};

const Body = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="mb-1 whitespace-pre-line">
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
  );
};

const Footer = ({
  owner,
  commentId,
  optimistic,
  totalReplies,
  deepReply = false,
}: {
  owner: UserData;
  commentId: string;
  optimistic?: boolean;
  totalReplies?: number;
  deepReply?: boolean;
}) => {
  return (
    <div className="flex gap-2 items-center w-max">
      <ReplyButton
        deepReply={deepReply}
        totalReplies={totalReplies}
        commentId={commentId}
        username={owner.username}
      />
      {optimistic && <BiLoaderAlt size={25} className="animate-spin" />}
    </div>
  );
};

CommentCard.Header = Header;
CommentCard.Body = Body;
CommentCard.Footer = Footer;

export default CommentCard;
