"use client";
import { signInWithGoogle } from "@/app/lib/auth";
import LoaderSpinner from "@/app/loading";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const LoginButton = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleLogin = () => {
    startTransition(async () => {
      const { error, data } = await signInWithGoogle();
      console.log(data);
      if (!error && data) {
        console.log(data);
        router.push(data.url)
      } else {
        console.log(error);
      }
    });
  };
  return (
    <div>
      <button
        onClick={handleLogin}
        className="flex items-center justify-center w-full h-12 text-white bg-purple-600 rounded-lg p-2">
        {isPending ? <LoaderSpinner /> : "Login with Google"}
      </button>
    </div>
  );
};

export default LoginButton;
