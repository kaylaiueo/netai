import useCookies from "@/hooks/useCookies";
import EditProfileForm from "@/components/form/EditProfileForm";
import { getCurrentUser } from "@/utils/getData";
import BackButton from "@/components/ui/BackButton";

const EditProfilePage = async () => {
  const { userId } = useCookies();
  const { currentUser } = await getCurrentUser();

  return (
    <>
      <header className="flex gap-2 items-center pt-4 pb-2">
        <BackButton />
        <h1 className="text-xl md:text-2xl font-bold">Edit Profile</h1>
      </header>

      <section>
        <EditProfileForm currentUser={currentUser} userId={userId} />
      </section>
    </>
  );
};

export default EditProfilePage;
