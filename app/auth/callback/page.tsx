import { getUserServer, saveUserToDatabase } from "@/app/lib/auth-helpers";
import { redirect } from "next/navigation";

export default async function AuthCallback() {
  const user = await getUserServer();

  if (!user) {
    redirect("/");
  }
  await saveUserToDatabase(user);
  redirect("/podcasts");
}
