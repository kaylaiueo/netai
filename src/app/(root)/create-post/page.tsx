import useCookies from "@/hooks/useCookies";
import CreatePostForm from "@/components/form/CreatePostForm";
import ProfilePicture from "@/components/ui/ProfilePicture";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/utils/getData";
import BackButton from "@/components/ui/BackButton";

const CreatePostPage = async () => {
  const { userId } = useCookies();
  if (!userId) redirect("/login");

  const { currentUser } = await getCurrentUser();

  return (
    <>
      <header className="flex gap-2 items-center py-4">
        <BackButton />
        <h1 className="text-xl md:text-2xl font-bold">Create Post</h1>
      </header>

      <div className="flex items-start gap-2">
        <ProfilePicture
          src={currentUser.picture}
          size={100}
          className="w-10 h-max"
        />
        <CreatePostForm userId={userId} username={currentUser.username} />
      </div>
    </>
  );
};

export default CreatePostPage;
