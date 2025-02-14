import type { Metadata } from "next";
import { Montserrat, Dancing_Script } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Suspense } from "react";
import Loading from "./loading";

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
      <body className={`${montserrat.className} relative`}>
        <Suspense fallback={<Loading />}>
          <div className="flex bg-gradient-to-b  from-black via-purple-950 to-purple-700">
            <Header />
            <main className="flex-1 min-h-screen border-opacity-20 border border-[#ddd]">
              <div>{children}</div>
            </main>
            <Sidebar />
          </div>
        </Suspense>
      </body>
    </html>
  );
}
