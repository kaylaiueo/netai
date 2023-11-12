import ActivityLayout from "@/components/layouts/ActivityLayout";
import useCookies from "@/hooks/useCookies";
import { redirect } from "next/navigation";
import ActivitySection from "@/components/activity/ActivitySection";
import MentionSection from "@/components/activity/MentionSection";

const ActivityPage = async ({
  searchParams: { tab },
}: {
  searchParams: { tab: "mentions" };
}) => {
  const { userId } = useCookies();
  if (!userId) redirect("/login");

  return (
    <ActivityLayout type={tab}>
      {tab === "mentions" ? (
        <MentionSection userId={userId} />
      ) : (
        <ActivitySection userId={userId} />
      )}
    </ActivityLayout>
  );
};

export default ActivityPage;
