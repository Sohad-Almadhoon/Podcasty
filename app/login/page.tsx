import { redirect } from "next/navigation";
import { getUser } from "../lib/supabase";
import LoginButton from "@/components/buttons/LoginButton";

const LoginPage = async () => {
  const user = await getUser();

  if (user) {
    redirect("/"); 
  }

  return (
    <div className="min-h-screen border w-full flex items-center mx-auto bg-gradient-to-b from-black via-purple-950 to-purple-700">
      <img src="/images/google.jpg" alt="" />
      <LoginButton />
    </div>
  );
};

export default LoginPage;
