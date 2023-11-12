import React from "react";
import { BiLoaderAlt } from "react-icons/bi";

const Loader = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex justify-center items-center w-full ${className}`}>
      <BiLoaderAlt size={25} className="animate-spin" />
    </div>
  );
};

export default Loader;
