"use client";

import { useRouter } from "next/navigation";

const Adiv = ({
  href,
  children,
  className = "",
  as,
  id,
}: {
  href?: string;
  as?: "span";
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => {
  const router = useRouter();

  return as ? (
    <span
      onClick={(e) => {
        e.stopPropagation();
        href && router.push(href);
      }}
      className={`cursor-pointer ${className}`}>
      {children}
    </span>
  ) : (
    <div
      id={id}
      onClick={(e) => {
        e.stopPropagation();
        href && router.push(href);
      }}
      className={`cursor-pointer ${className}`}>
      {children}
    </div>
  );
};

export default Adiv;
