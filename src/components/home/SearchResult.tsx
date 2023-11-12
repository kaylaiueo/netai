import FollowButton from "@/components/ui/FollowButton";
import ProfilePicture from "@/components/ui/ProfilePicture";
import useCookies from "@/hooks/useCookies";
import useFetch from "@/hooks/useFetch";
import type { UserData } from "@/types";
import Adiv from "@/components/ui/Adiv";
import { TbCircleCheckFilled } from "react-icons/tb";

const SearchResult = async ({ query }: { query: string }) => {
  const { userId } = useCookies();
  const { data } = await useFetch<UserData[]>(
    `/user/search/${query}?id=${userId}`
  );

  return (
    <>
      {data.length > 0 ? (
        data.map((user, i) => (
          <Adiv
            key={i}
            href={`/@${user.username}`}
            className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <ProfilePicture src={user.picture} className="w-10 h-max" />

              <div>
                <div className="flex gap-2 items-center">
                  <p>{user.username}</p>
                  {user.verify && (
                    <TbCircleCheckFilled
                      title="Verified"
                      className="text-blue-500"
                      size={19}
                    />
                  )}
                </div>
                {user.name && (
                  <p className="text-gray-500 dark:text-gray-400">
                    {user.name}
                  </p>
                )}
              </div>
            </div>

            <FollowButton
              className="px-4"
              userId={userId}
              username={user.username}
              followers={user.followers}
            />
          </Adiv>
        ))
      ) : (
        <p className="text-gray-500">No results found</p>
      )}
    </>
  );
};

export default SearchResult;
