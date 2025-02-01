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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("description", { required: "Description is required" })}
          placeholder="Enter podcast description..."
          className="border p-2 w-full"
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded">
          Generate Podcast
        </button>
      </form>

      {podcast && (
        <div className="mt-6">
          <img
            src={podcast.imageUrl}
            alt="Podcast Cover"
            className="w-64 h-64 object-cover"
          />
          <audio controls className="mt-4">
            <source src={podcast.audioUrl} type="audio/mpeg" />
            Your browser does not support the audio tag.
          </audio>
        </div>
      )}
    </div>
  );
}
