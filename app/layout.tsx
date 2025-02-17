import type { Metadata } from "next";
import { Montserrat, Dancing_Script } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import LoaderSpinner from "./loading";
import { AiTwotonePlayCircle } from "react-icons/ai";
import Link from "next/link";
import AudioProvider from "./providers/AudioProvider";
import LeftSidebar from "@/components/LeftSidebar";
import Logo from "@/components/Logo";
import MobileNav from "@/components/NavMobile";
import RigthSidebar from "@/components/RigthSidebar";
import PodcastPlayer from "@/components/PodcastPlayer";

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
    <html lang="en" suppressHydrationWarning>
      <AudioProvider>
        <body className={`${montserrat.className}`}>
          <div className="flex bg-gradient-to-b  from-black via-purple-950 to-purple-700">
            <LeftSidebar />
            <main className="flex-1">
              <div className="flex px-4 h-16 items-center justify-between md:hidden">
                <Logo />
                {/* <MobileNav /> */}
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
