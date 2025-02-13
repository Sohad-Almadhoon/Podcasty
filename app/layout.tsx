import type { Metadata } from "next";
import { Montserrat, Dancing_Script } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
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
      <body className={`${montserrat.className}`}>
        <div className="flex bg-gradient-to-b from-black via-purple-950 to-purple-700">
          <Header />

          <main className="flex-1   border-opacity-20 border border-[#ddd]">
            <div>{children}</div>
          </main>
          <div className="bg-gradient-to-b  flex flex-col text-white p-5 max-w-xs w-full">
            <h2 className="text-2xl font-bold text-white my-6 mb-10">
              Top Podcasts
            </h2>

            <Sidebar />
          </div>
        </div>
      </body>
    </html>
  );
}
