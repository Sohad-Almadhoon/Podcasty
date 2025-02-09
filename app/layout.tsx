import type { Metadata } from "next";
import { Montserrat, Dancing_Script } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { BiSolidUser, BiUser } from "react-icons/bi";
import { BsPlayCircleFill } from "react-icons/bs";
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "500", "700", "800"],
  display: "swap",
});
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"], // You can adjust this based on your needs
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

            <ul className="space-y-6">
              {[1, 2, 3, 4, 6].map(() => (
                <li className="bg-gray-800 p-5 rounded-lg flex flex-col hover:bg-purple-700 transition duration-300 ease-in-out">
                  <div className="gap-4">
                    <span className=" font-semibold text-white">
                      The Creative Mind
                    </span>
                    <p className="text-xs">By Sohad Almadhoon</p>
                  </div>
                  <div className="text-right">
                    <div className="flex gap-1 flex-col">
                      <div className="flex gap-2 items-center justify-end">
                        <BsPlayCircleFill />
                        45
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </body>
    </html>
  );
}
