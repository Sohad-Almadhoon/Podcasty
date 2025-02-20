import Logo from "@/components/shared/Logo";
import RigthSidebar from "@/components/shared/RigthSidebar";
import MobileNav from "@/components/shared/NavMobile";
import LeftSidebar from "@/components/shared/LeftSidebar";

export default function GroupedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LeftSidebar />
      <main className="flex-1">
        <div className="flex px-4 h-16 items-center justify-between md:hidden">
          <Logo />
          <MobileNav />
        </div>
        <div className="flex-1">{children}</div>
      </main>
      <RigthSidebar />
    </>
  );
}
