import { getUserByUsername } from "@/utils/getData";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const generateMetadata = async ({
  params: { username },
}: {
  params: {
    username: string;
  };
}): Promise<Metadata> => {
  const { user } = await getUserByUsername(username);
  if (!user) return notFound();

  return {
    title: `${user.name ?? ""} (@${user.username}) on Netai`,
    description: `${user.bio ?? ""} | ${user.followers.length} Followers. ${
      user.posts.length
    } Posts. ${user.following.length} Following.`,
    openGraph: {
      images: {
        url:
          user.picture ??
          "https://res.cloudinary.com/dvc3vlqzv/image/upload/v1699806780/logo_rjnbfj.png",
      },
      url: `https://netai.vercel.app/@${user.username}`,
      type: "profile",
      title: `${user.name ?? ""} (@${user.username}) on Netai`,
      description: `${user.bio ?? ""} | ${user.followers.length} Followers. ${
        user.posts.length
      } Posts. ${user.following.length} Following.`,
    },
  };
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
