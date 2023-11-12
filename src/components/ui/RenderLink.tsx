import Link from "next/link";
import Adiv from "./Adiv";

const RenderLink = ({
  attributes,
  content,
}: {
  attributes: React.AnchorHTMLAttributes<HTMLAnchorElement>;
  content: string;
}) => {
  const { href, ...props } = attributes;

  return (
    <Adiv as="span">
      <Link
        href={href!}
        className="text-blue-600 dark:text-blue-500 hover:underline"
        {...props}>
        {content}
      </Link>
    </Adiv>
  );
};

export default RenderLink;
