import './globals.css';
import LeftSidebar from "@/components/LeftSidebar";
import Logo from "@/components/Logo";

import PodcastPlayer from "@/components/PodcastPlayer";

import MobileNav from "@/components/NavMobile";
import RigthSidebar from "@/components/RigthSidebar";
import AudioProvider from './providers/AudioProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <AudioProvider>
        <body>
          <div className="flex bg-gradient-to-b  from-black via-purple-950 to-purple-700">
            <LeftSidebar />
            <main className="flex-1">
              <div className="flex px-4 h-16 items-center justify-between md:hidden">
                <Logo />
                <MobileNav />
              </div>
              <div className="flex-1">{children}</div>
            </main>
            <RigthSidebar />
          </div>
          <PodcastPlayer />
        </body>
      </AudioProvider>
    </html>
  );
}
