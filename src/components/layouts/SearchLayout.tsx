"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef } from "react";
import { BsImages, BsLayoutTextWindow } from "react-icons/bs";
import { FiSearch, FiArrowLeft } from "react-icons/fi";

interface Props {
  children: React.ReactNode;
  type?: "media";
}

const SearchLayout = ({ children, type = undefined }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    inputRef.current?.blur();

    if (inputRef.current && inputRef.current.value) {
      router.replace(
        `/?${createQueryString("q", inputRef.current.value.trim())}`
      );
    }
  };

  return (
    <>
      <div className="sticky bg-white dark:bg-[#121212] top-0 z-40 pt-4 pb-2">
        <div className="flex gap-2 items-center">
          {searchParams.get("q") && (
            <Link replace href="/" className="px-2">
              <FiArrowLeft size={22} />
            </Link>
          )}

          <form onSubmit={handleSearch} className="relative group w-full">
            <input
              ref={inputRef}
              type="search"
              placeholder="Search..."
              className="w-full py-2 pr-4 pl-10 rounded-lg bg-gray-200 dark:bg-white/10 outline-none"
            />
            <FiSearch
              size={22}
              title="Search"
              className="absolute top-2 left-3 group-focus-within:text-gray-400"
            />
          </form>
        </div>

        {!searchParams.get("q") && (
          <nav className="w-full">
            <ul className="flex items-center w-full justify-evenly text-center">
              <li
                className={`py-2 w-full ${
                  !type
                    ? "border-b border-b-black dark:border-b-white"
                    : "border-b border-b-gray-200 dark:border-b-white/10"
                }`}>
                <Link
                  replace
                  href="/"
                  className="flex gap-2 items-center justify-center">
                  <BsLayoutTextWindow size={17} /> Posts
                </Link>
              </li>

              <li
                className={`py-2 w-full ${
                  type === "media"
                    ? "border-b border-b-black dark:border-b-white"
                    : "border-b border-b-gray-200 dark:border-b-white/10"
                }`}>
                <Link
                  replace
                  href="/?tab=media"
                  className="flex gap-2 items-center justify-center">
                  <BsImages size={20} /> Media
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>

      {children}
    </>
  );
};

export default SearchLayout;
