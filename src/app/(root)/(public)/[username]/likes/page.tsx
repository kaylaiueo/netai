import ProfileHeader from "@/components/profile/ProfileHeader";
import useCookies from "@/hooks/useCookies";
import { redirect } from "next/navigation";
import { getUserByUsername } from "@/utils/getData";
import PostSection from "@/components/profile/PostSection";

interface Params {
  params: {
    username: string;
  };
}

const LikesPage = async ({ params: { username } }: Params) => {
  const { userId } = useCookies();
  if (!userId) redirect("/login");

  const { user } = await getUserByUsername(username);

  return (
    <ProfileHeader type="likes" user={user} userId={userId}>
      <PostSection
        userId={userId}
        username={username.slice(3)}
        type="likedPosts"
      />
    </ProfileHeader>
  );
};

export default LikesPage;
