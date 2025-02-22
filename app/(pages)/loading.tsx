import { Loader } from "lucide-react";

const LoaderSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Loader className="animate-spin text-orange-1" size={60} />
    </div>
  );
};

export default LoaderSpinner;