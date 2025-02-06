export default function Home() {

  return (
    <main className="container mx-auto px-6 py-12">
      <section className="flex flex-col md:flex-row justify-between items-center px-12">
        <div className="text-center md:text-left ">
          <h1 className="text-4xl font-bold text-[#EDEDED]">
            Welcome to Podcasty!
          </h1>
          <p className="mt-4 text-[#EDEDED] max-w-lg">
            Discover, create, and share amazing podcasts. Upload your audio,
            generate voice content, and grow your audience with ease.
          </p>
        </div>
        <div className="">
          <img
            src="/images/test.png"
            alt="Podcast illustration"
            className="shadow-lg h-[500px] rounded-full"
          />
        </div>
      </section>
      <section className="mt-12 text-center">
        <h2 className="text-3xl font-semibold text-[#EDEDED]">
          About Podcasty
        </h2>
        <p className="mt-4 text-[#EDEDED] max-w-2xl mx-auto">
          Podcasty is a platform designed to help creators produce and share
          their podcasts effortlessly. Whether you're an aspiring podcaster or
          an experienced professional, our tools make it easy to create
          high-quality audio content and connect with your audience.
        </p>
        <div className="mt-6 grid grid-cols-3 gap-7">
          <img
            src="/images/test3.jpg"
            alt="Podcast concept illustration"
            className="mx-auto rounded-lg shadow-lg"
          />
          <img
            src="/images/test2.jpg"
            alt="Podcast concept illustration"
            className="mx-auto rounded-lg shadow-lg"
          />
          <img
            src="/images/test3.jpg"
            alt="Podcast concept illustration"
            className="mx-auto rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="mt-12 text-center">
        <h2 className="text-3xl font-semibold text-[#EDEDED]">
          Let's Get Started
        </h2>
        <p className="mt-4 text-[#EDEDED] max-w-2xl mx-auto">
          Ready to share your voice with the world? Get started by creating your
          first podcast today!
        </p>
        <button className="mt-6 px-6 py-3 bg-white text-purple-950 font-medium rounded-lg shadow-md hover:bg-purple-900 hover:text-white transition">
          Start Now
        </button>
      </section>
    </main>
  );
}
