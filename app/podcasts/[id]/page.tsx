"use client";
import VoicePlayer from "@/app/components/VoicePlayer";
import Link from "next/link";
import React from "react";
import { BsHeartFill, BsPlayCircleFill } from "react-icons/bs";


const PodcastDetails = () => {
  return (
    <div className=" min-h-screen">
      <div className="flex px-10 text-white mt-10 gap-5">
        <div className="flex flex-col lg:mb-0 mb-5 flex-1">
          <h1 className="text-3xl mb-4 font-bold">Podcast Name</h1>
          <p className="text-sm">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam
            laborum ex nostrum nesciunt, sapiente molestias, error nihil, ea
            ducimus adipisci illum consequatur minima praesentium sit nulla!
            Accusamus quo voluptate harum.
          </p>
          <p className="mt-5 text-sm bg-black shadow-lg p-3 w-fit rounded-xl font-semibold flex items-center gap-6">
            AI VOICE{" "}
            <span className="text-purple-700 bg-white p-2 rounded-xl">
              SHIMMER
            </span>
          </p>
          <div className="flex justify-end gap-5 text-sm items-center">
            <span className="flex gap-1 items-center">
              4 <BsPlayCircleFill className="text-base" />
            </span>
            <span className="flex gap-1 items-center">
              6 <BsHeartFill />
            </span>
          </div>
        </div>
        <div className="flex-1 self-end flex flex-col items-end">
          <div>
            <img src="/images/1.jpeg" alt="" className="mb-4 rounded-full" />
          </div>
          <VoicePlayer url="" />
        </div>
      </div>
      <div className="mt-5 px-10">
        <h4 className="text-xl text-white mb-4 font-bold">
          Another Podcasts for this User!
        </h4>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 ">
          {[1, 2, 3, 4, 5, 6, 7].map(() => (
            <Link
              href="/podcasts/1"
              className="text-white rounded-md shadow-md overflow-hidden">
              <img
                src={"/images/1.jpeg"}
                alt=""
                className="rounded-xl h-56 w-full object-cover"
              />
              <div className="p-3">
                <p className="text-lg font-semibold">JS Jungle News</p>
                <p className="text-xs">
                  Learn What is Javascript in Simple Terms...
                </p>
                <div className="flex justify-end gap-5 text-sm items-center">
                  <span className="flex gap-1 items-center">
                    4 <BsPlayCircleFill className="text-base" />
                  </span>
                  <span className="flex gap-1 items-center">
                    6 <BsHeartFill />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PodcastDetails;
