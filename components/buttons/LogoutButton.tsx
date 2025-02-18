"use client";
import { signOut } from "@/app/lib/auth";
import LoaderSpinner from "@/app/loading";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const LogoutButton = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleLogout = () => {
    startTransition(async () => {
      const { error } = await signOut();
      if (!error) {
        router.push("/login");
      } else {
        console.log(error);
      }
    });
  };
  return (
    <div>
      <button
        onClick={handleLogout}
        className="flex items-center justify-center w-full h-12 text-white bg-purple-600 rounded-lg">
        {isPending ? <LoaderSpinner /> : "Logout"}
      </button>
    </div>
  );
};

export default LogoutButton;
