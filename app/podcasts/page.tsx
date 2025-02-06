import Link from "next/link";

const Podcasts = () => {
  return (
    <div className="p-5">
      <h1 className="text-3xl my-4 italic text-white text-center">
        Popular Podcasts
      </h1>
      <div className="max-w-xl mx-auto mb-6">
        <input
          placeholder="Search About podcast..."
          className="border p-2 w-full rounded-md shadow-md"
        />
      </div>

      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8 px-10">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
          <Link href='/' className="bg-white shadow-md rounded-md overflow-hidden">
            <img src="/images/test2.jpg" alt="" className="" />
            <div className="p-3">
              <p className="text-lg text-purple-900 font-semibold">
                Podcast Name
              </p>
              <p className="text-sm text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                debitis quae nihil facilis cupiditate quo in excepturi
                asperiores sit optio.
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Podcasts;
