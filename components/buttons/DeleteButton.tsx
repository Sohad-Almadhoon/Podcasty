"use client";
import { deletePodcast } from "@/app/actions/users";
import { Podcast } from "@/app/types";
import React from "react";
import { AiFillDelete } from "react-icons/ai";

interface DeleteButtonProps {
  podcast: Podcast;
}

const DeleteButton = ({ podcast }: DeleteButtonProps) => {
  return (
    <form action={() => deletePodcast(podcast.id)}>
      <button
        type="submit"
        className="mt-3 p-2 absolute top-5 right-5 bg-purple-500 text-white rounded-full flex items-center gap-1 hover:bg-red-700">
        <AiFillDelete />
      </button>
    </form>
  );
};

export default DeleteButton;
