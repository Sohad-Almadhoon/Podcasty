const Podcasts = () => {

  return (
    <div className="p-5">
      <h1 className="text-3xl my-4 italic text-center">Popular Podcasts</h1>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8 px-10">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
          <div className="bg-white shadow-md rounded-md overflow-hidden">
            <img src="/images/test.jpg" alt="" className="" />
            <div className="p-3">
              <p className="text-lg text-purple-600 font-semibold">Podcast Name</p>
              <p className="text-sm text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                debitis quae nihil facilis cupiditate quo in excepturi
                asperiores sit optio.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Podcasts;
