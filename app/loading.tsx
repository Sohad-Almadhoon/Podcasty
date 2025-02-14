"use client";
import { RotatingLines } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="flex items-center justify-center mt-2 h-full w-full">
      <RotatingLines
        width="50"
        strokeColor="#000"
        ariaLabel="triangle-loading"
        visible={true}
      />
    </div>
  );
};

export default Loading;
