import { BiLoaderAlt } from "react-icons/bi";

const Loading = () => {
  return (
    <div className="flex justify-center items-center max-md:h-screen h-full w-full">
      <BiLoaderAlt size={50} className="animate-spin" />
    </div>
  );
};

export default Loading;
