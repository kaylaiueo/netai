import useCookies from "@/hooks/useCookies";
import SearchLayout from "@/components/layouts/SearchLayout";
import SearchResult from "@/components/home/SearchResult";
import PostSection from "@/components/home/PostSection";

const HomePage = async ({
  searchParams: { q, tab },
}: {
  searchParams: { q: string; tab: "media" };
}) => {
  const { userId } = useCookies();

  return (
    <SearchLayout type={tab}>
      {q ? (
        <SearchResult query={q} />
      ) : (
        <PostSection
          imageOnly={tab === "media" ? true : false}
          userId={userId}
        />
      )}
    </SearchLayout>
  );
};

export default HomePage;
