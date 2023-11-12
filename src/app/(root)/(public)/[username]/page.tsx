import useCookies from "@/hooks/useCookies";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { getUserByUsername } from "@/utils/getData";
import PostSection from "@/components/profile/PostSection";
import { notFound } from "next/navigation";

interface Params {
  params: {
    username: string;
  };
}

const ProfilePage = async ({ params: { username } }: Params) => {
  const { userId } = useCookies();
  const { user } = await getUserByUsername(username);
  if (!user) return notFound();

  return (
    <ProfileHeader user={user} userId={userId}>
      <PostSection
        username={username.slice(3)}
        userId={userId}
        type="allPosts"
      />
    </ProfileHeader>
  );
};

export default ProfilePage;
