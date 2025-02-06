import React from "react";

const PodcastDetails = () => {
  return (
    <div className="flex p-6 lg:flex-row flex-col text-white h-screen">
      <div className="flex-1 flex mt-10 flex-col lg:px-16  lg:mb-0 mb-5">
        <h1 className="text-3xl mb-4 font-bold">Podcast Name</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam laborum
          ex nostrum nesciunt, sapiente molestias, error nihil, ea ducimus
          adipisci illum consequatur minima praesentium sit nulla! Accusamus quo
          voluptate harum.
        </p>
        <div className="mt-10 flex flex-col gap-4">
          <span>User Reviews</span>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto
            in ratione nam nemo nulla, reprehenderit quisquam quaerat eius
            nostrum, placeat explicabo numquam, asperiores porro? Esse
            repellendus accusantium laboriosam officiis ratione?
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto
            in ratione nam nemo nulla, reprehenderit quisquam quaerat eius
            nostrum, placeat explicabo numquam, asperiores porro? Esse
            repellendus accusantium laboriosam officiis ratione?
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto
            in ratione nam nemo nulla, reprehenderit quisquam quaerat eius
            nostrum, placeat explicabo numquam, asperiores porro? Esse
            repellendus accusantium laboriosam officiis ratione?
          </p>
        </div>
        <div className="mt-5">
          Another Podcasts for this User!
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            voluptas doloremque blanditiis, consequatur at sequi repellendus
            aperiam porro ipsam nesciunt magnam accusamus veniam unde non
            dolorum dicta pariatur deleniti consequuntur.
          </p>
        </div>
      </div>
      <div className="flex-1">
        <img src="/images/test2.jpg" alt="" className="mb-4 rounded-lg" />
        <audio controls>
          <source />
        </audio>
      </div>
    </div>
  );
};

export default PodcastDetails;
