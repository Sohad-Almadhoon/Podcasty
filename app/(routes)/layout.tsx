import LeftSidebar from "@/components/LeftSidebar";
import Logo from "@/components/Logo";
import PodcastPlayer from "@/components/PodcastPlayer";
import MobileNav from "@/components/NavMobile";
import RigthSidebar from "@/components/RigthSidebar";
import AudioProvider from "../providers/AudioProvider";

export default function GroupedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AudioProvider>
        <LeftSidebar />
        <main className="flex-1">
          <div className="flex px-4 h-16 items-center justify-between md:hidden">
            <Logo />
            <MobileNav />
          </div>
          <div className="flex-1">{children}</div>
        </main>
        <RigthSidebar />
        <PodcastPlayer />
    </AudioProvider>
  );
}
