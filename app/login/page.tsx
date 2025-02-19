import { redirect } from "next/navigation";
import { getUser } from "../lib/supabase";
import LoginButton from "@/components/buttons/LoginButton";

const LoginPage = async () => {
  const user = await getUser();

  if (user) {
    redirect("/podcasts");
  }

  return (
    <div className="min-h-screen border w-full flex items-center justify-center mx-auto bg-gradient-to-b from-black via-purple-950 to-purple-700">
      <LoginButton />
    </div>
  );
};

export default LoginPage;
