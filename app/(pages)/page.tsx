import Link from "next/link";
import { getUser } from "../lib/supabase";

export default async function Home() {
 console.log(await getUser())
  return (
    <main className="container mx-auto px-6 py-12">
      <section className="flex flex-col md:flex-row justify-between items-center mt-12">
        <div className="md:text-left flex-1 gap-5 p-1">
          <h1 className="lg:text-4xl text-3xl font-bold text-[#EDEDED]">
            Welcome to Podcasty!
          </h1>
          <p className="mt-4 text-[#EDEDED] lg:max-w-sm lg:text-sm text-xs text-left">
            AI Podcast is your gateway to seamless, AI-generated storytelling.
            Our platform leverages cutting-edge artificial intelligence to
            transform text into immersive audio experiences. Whether you're a
            content creator, educator, or entrepreneur, AI Podcast empowers you
            to bring your ideas to life with high-quality, natural-sounding
            voices.
          </p>
        </div>
        <div className="flex-1">
          <img
            src="/images/3.svg"
            alt="Podcast illustration"
            className="lg:h-[500px] h-96 mt-5 lg:mt-0"
          />
        </div>
      </section>
      <section className="mt-12 max-w-xl">
        <h2 className="lg:text-3xl text-2xl font-semibold text-[#EDEDED]">
          About Podcastify
        </h2>
        <p className="mt-4 text-[#EDEDED] max-w-xl mx-auto lg:text-sm text-xs">
          At AI Podcast, we believe in the power of technology to make content
          creation more accessible and engaging. Our platform allows you to
          input text, generate AI-driven narration, and store your podcast
          content effortlessly. With features like customizable voice options
          and automated audio generation, AI Podcast is designed to help you
          create professional-grade podcasts in minutes. Join us in redefining
          the future of podcasting with AI-driven innovation!
        </p>
        <div className="mt-10 grid grid-cols-3 items-center lg:gap-0 gap-5">
          <img
            src="/images/2.svg"
            alt="Podcast concept illustration"
            className="lg:h-48 h-42 w-full"
          />
          <img
            src="/images/7.svg"
            alt="Podcast concept illustration"
            className="lg:h-48 h-42 w-full"
          />
          <img
            src="/images/4.svg"
            alt="Podcast concept illustration"
            className="lg:h-48 h-42 w-full"
          />
        </div>
      </section>

      <section className="mt-16 text-center">
        <h2 className="lg:text-3xl text-2xl font-semibold text-[#EDEDED]">
          Let's Get Started
        </h2>
        <p className="mt-4 text-[#EDEDED] max-w-2xl mx-auto mb-9 lg:text-sm text-xs">
          Ready to share your voice with the world? Get started by creating your
          first podcast today!
        </p>
        <Link
          href="/podcasts/create"
          className="mt-6 px-6 py-3 bg-black text-white font-medium rounded-lg shadow-md hover:bg-purple-900 hover:text-white transition">
          Start Now
        </Link>
      </section>
    </main>
  );
}
