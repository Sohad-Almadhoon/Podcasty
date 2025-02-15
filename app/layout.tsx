import type { Metadata } from "next";
import { Montserrat, Dancing_Script } from "next/font/google";
import "./globals.css";
import LeftSidebar from "./components/LeftSidebar";
import { Suspense } from "react";
import LoaderSpinner from "./loading";
import PodcastPlayer from "./components/PodcastPlayer";
import RigthSidebar from "./components/RigthSidebar";
import MobileNav from "./components/NavMobile";
import { AiTwotonePlayCircle } from "react-icons/ai";
import Link from "next/link";
import AudioProvider from "./providers/AudioProvider";
import Logo from "./components/Logo";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "500", "700", "800"],
  display: "swap",
});
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Podcasty",
  description: "Listen to your favorite podcasts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AudioProvider>
        <body className={`${montserrat.className}`}>
          <div className="flex bg-gradient-to-b  from-black via-purple-950 to-purple-700">
            <LeftSidebar />
            <main className="flex-1">
              <div className="flex px-4 h-16 items-center justify-between md:hidden">
                <Logo />
                <MobileNav />
              </div>
              <Suspense fallback={<LoaderSpinner />}>
                <div className="flex-1">{children}</div>
              </Suspense>
            </main>
            <RigthSidebar />
          </div>
          <PodcastPlayer />
        </body>
      </AudioProvider>
    </html>
  );
}
