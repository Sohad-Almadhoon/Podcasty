"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function PodcastForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [podcast, setPodcast] = useState<{
    imageUrl: string;
    audioUrl: string;
  } | null>(null);

  const onSubmit = async (data: { description: string }) => {
    try {
      const response = await axios.post("/api/podcast", data);
      setPodcast(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={() => {}} className="space-y-4 max-w-lg mx-auto my-56">
        <h1 className="text-3xl border-b-4 border-purple-500 w-fit pb-1 font-bold">
          Generate Your Own Podcast
        </h1>
        <div>
          <input
            {...register("pocast_name", {
              required: "Podcast Name is required",
            })}
            placeholder="Enter podcast name..."
            className="border p-2 w-full"
          />
          {errors.description && <p className="text-red-500"></p>}
        </div>
        <div>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Enter podcast description..."
            className="border p-2 w-full"
          />
          {errors.description && <p className="text-red-500"></p>}
        </div>
        <button
          type="submit"
          className="bg-purple-500 text-white px-4 py-2 rounded">
          Generate Podcast
        </button>
      </form>
    </div>
  );
}
