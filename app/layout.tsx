import './globals.css';
import { ReactNode } from "react";
import { Montserrat, Dancing_Script } from 'next/font/google';
import PodcastPlayer from '@/components/shared/PodcastPlayer';
import AudioProvider from './providers/AudioProvider';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat', 
});

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing-script', 
});
export default function BasicLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} ${dancingScript.variable}`}>
        <AudioProvider>
          <div className="flex bg-gradient-to-b from-black via-purple-950 to-purple-700">
            {children}
          </div>
          <PodcastPlayer />
        </AudioProvider>
      </body>
    </html>
  );
}
