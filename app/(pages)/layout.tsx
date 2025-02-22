import Logo from "@/components/shared/Logo";
import RigthSidebar from "@/components/shared/RigthSidebar";
import MobileNav from "@/components/shared/NavMobile";
import LeftSidebar from "@/components/shared/LeftSidebar";
import { Suspense } from "react";
import LoaderSpinner from "./loading";
import { getUser } from "../lib/supabase";
import { redirect } from "next/navigation";

export default async function GroupedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  if(!user) redirect("/login");
  return (
    <>
      <LeftSidebar />
        {" "}
        <main className="flex-1">
          <div className="flex px-4 h-16 items-center justify-between md:hidden">
            <Logo />
            <MobileNav />
          </div>
          <Suspense fallback={<LoaderSpinner />}>{children}</Suspense>
        </main>
      <RigthSidebar />
    </>
  );
}
