import React from "react";

const PodcastDetails = () => {
  return (
    <div className="flex p-6 lg:flex-row flex-col">
      <div className="flex-1 flex justify-center flex-col lg:px-16  lg:mb-0 mb-5">
        <h1 className="text-3xl mb-4 font-bold">Podcast Name</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam laborum
          ex nostrum nesciunt, sapiente molestias, error nihil, ea ducimus
          adipisci illum consequatur minima praesentium sit nulla! Accusamus quo
          voluptate harum.
        </p>
      </div>
      <div className="flex-1">
        <img src="/images/test.jpg" alt="" className="mb-4 rounded-lg" />
        <audio controls>
          <source />
        </audio>
      </div>
    </div>
  );
};

export default PodcastDetails;
