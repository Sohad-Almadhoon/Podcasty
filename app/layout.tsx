import type { Metadata } from "next";
import { Montserrat, Dancing_Script } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
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
        <div className="flex">
          <Header />

          <main className="bg-gradient-to-b shadow-md from-black via-purple-900 to-purple-700">
            <div>{children}</div>
          </main>
          <div className="p-6 bg-gradient-to-b from-black via-purple-900 to-purple-700 rounded-lg max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Top Podcasts
            </h2>

            <ul className="space-y-6">
              <li className="bg-white text-purple-900 p-5 rounded-lg flex justify-between items-center hover:bg-purple-700 transition duration-300 ease-in-out">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold ">
                    The Daily Buzz
                  </span>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-yellow-400">★★★★☆</span>
                    <span className="">(150)</span>
                  </div>
                </div>
              </li>
               <li className="bg-white text-purple-900 p-5 rounded-lg flex justify-between items-center hover:bg-purple-700 transition duration-300 ease-in-out">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold ">
                    The Daily Buzz
                  </span>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-yellow-400">★★★★☆</span>
                    <span className="">(150)</span>
                  </div>
                </div>
              </li>
              <li className="bg-gray-800 p-5 rounded-lg flex justify-between items-center hover:bg-purple-700 transition duration-300 ease-in-out">
                <div className="flex items-center gap-4">
                  <span className="text-lg font-semibold text-white">
                    The Creative Mind
                  </span>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★★★★★</span>
                    <span className="text-gray-300">(200 Reviews)</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </body>
    </html>
  );
}
