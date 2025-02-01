import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "500", "700", "800"],
  display: "swap",
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
      <body className={montserrat.className}>
      
        <main>{children}</main>
    
      </body>
    </html>
  );
}
