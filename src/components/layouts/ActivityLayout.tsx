import Link from "next/link";
import BackButton from "../ui/BackButton";

const ActivityLayout = ({
  children,
  type = undefined,
}: {
  children: React.ReactNode;
  type?: "mentions";
}) => {
  return (
    <>
      <header className="sticky top-0 z-40 bg-white dark:bg-[#121212] pt-4 pb-2">
        <div className="flex items-center gap-2 pb-2">
          <BackButton />
          <h1 className="text-xl md:text-2xl font-bold">Activity</h1>
        </div>

        <nav className="w-full">
          <ul className="flex items-center w-full justify-evenly text-center">
            <li
              className={`py-2 w-full border-b hover:bg-gray-200 dark:hover:bg-white/10 ${
                !type
                  ? "border-b-black dark:border-b-white"
                  : "border-b-gray-200 dark:border-b-white/10"
              }`}>
              <Link
                replace
                href="/activity"
                className="flex gap-2 items-center justify-center">
                For you
              </Link>
            </li>
            <li
              className={`py-2 w-full border-b hover:bg-gray-200 dark:hover:bg-white/10 ${
                type === "mentions"
                  ? "border-b-black dark:border-b-white"
                  : "border-b-gray-200 dark:border-b-white/10"
              } `}>
              <Link
                replace
                href="/activity?tab=mentions"
                className="flex gap-2 items-center justify-center">
                Mentions
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {children}
    </>
  );
};

export default ActivityLayout;
