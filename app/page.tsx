export default function Home() {

  return (
    <main className="container mx-auto px-6 py-12">
      <section className="flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left flex-1 gap-5 p-1">
          <h1 className="text-4xl font-bold text-[#EDEDED]">
            Welcome to Podcasty!
          </h1>
          <p className="mt-4 text-[#EDEDED] max-w-sm text-sm">
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
            className="h-[500px]"
          />
        </div>
      </section>
      <section className="mt-12">
        <h2 className="text-3xl text-center font-semibold text-[#EDEDED]">
          About Podcastify
        </h2>
        <p className="mt-4 text-[#EDEDED] max-w-xl mx-auto text-sm">
          At AI Podcast, we believe in the power of technology to make content
          creation more accessible and engaging. Our platform allows you to
          input text, generate AI-driven narration, and store your podcast
          content effortlessly. With features like customizable voice options
          and automated audio generation, AI Podcast is designed to help you
          create professional-grade podcasts in minutes. Join us in redefining
          the future of podcasting with AI-driven innovation!
        </p>
        <div className="mt-10 grid grid-cols-3">
          <img
            src="/images/7.svg"
            alt="Podcast concept illustration"
            className="h-48 w-full"
          />
          <img
            src="/images/6.svg"
            alt="Podcast concept illustration"
            className="h-48 w-full"
          />
          <img
            src="/images/2.svg"
            alt="Podcast concept illustration"
            className="h-48 w-full"
          />
        </div>
      </section>

      <section className="mt-16 text-center">
        <h2 className="text-3xl font-semibold text-[#EDEDED]">
          Let's Get Started
        </h2>
        <p className="mt-4 text-[#EDEDED] max-w-2xl mx-auto">
          Ready to share your voice with the world? Get started by creating your
          first podcast today!
        </p>
        <button className="mt-6 px-6 py-3 bg-black text-white font-medium rounded-lg shadow-md hover:bg-purple-900 hover:text-white transition">
          Start Now
        </button>
      </section>
    </main>
  );
}
