import Image from "next/image";

type Props = {
  src?: string;
  size?: number;
  className?: string;
  preview?: string;
};

const ProfilePicture = ({ src, className, preview, size = 100 }: Props) => {
  return (
    <Image
      draggable={false}
      src={preview ? preview : src ? src : "/profile.png"}
      alt="Profile Picture"
      width={size}
      height={size}
      className={`rounded-full aspect-square object-cover bg-gray-200 ${className}`}
    />
  );
};

export default ProfilePicture;
