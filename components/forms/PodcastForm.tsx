"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { getUser } from "@/app/lib/supabase";
import {
  createPodcast,
  generatePodcastContent,
} from "@/app/actions/server/upload.action";
import { AiVoice } from "@/app/types";

export default function PodcastForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<{
    podcast_name: string;
    description: string;
    ai_voice: AiVoice;
    ai_prompt: string;
  }>();

  const [generatedPodcast, setGeneratedPodcast] = useState<{
    imageUrl: string;
    audioUrl: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const user = await getUser();
      if (user) {
        setUserId(user.id);
      }
    };

    fetchUserId();
  }, []);

  const generateAIContent = async (aiPrompt: string, aiVoice: AiVoice) => {
    setLoading(true);
    try {
    
      const result = await generatePodcastContent(aiPrompt, aiVoice);
      if (result.success) {
        setGeneratedPodcast({
          imageUrl: result.imageUrl!,
          audioUrl: result.audioUrl!,
        });
      } else {
        console.error("Error generating AI content:", result.error);
        alert(
          "There was an error generating the AI content. Please try again."
        );
      }
    } catch (error) {
      console.error("Error generating AI content:", error);
      alert("There was an error generating the AI content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: {
    podcast_name: string;
    description: string;
    ai_voice: string;
    ai_prompt: string;
  }) => {
    if (!generatedPodcast || !userId) return;

    const { ai_prompt, ...filteredData } = data;

    try {
      console.log({
        ...filteredData,
        ...generatedPodcast,
        user_id: userId,
      });
      const podcastData = await createPodcast({
        ...filteredData,
        ...generatedPodcast,
        user_id: userId,
      });

      console.log("Podcast created successfully:", podcastData);
      router.push("/podcasts"); // Redirect to the podcasts page
    } catch (error) {
      console.error("Error creating podcast:", error);
      alert("There was an error creating the podcast. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-purple-950 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Create Podcast</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Podcast Name */}
          <div>
            <label className="block font-medium mb-1">Podcast Name</label>
            <input
              {...register("podcast_name", {
                required: "Podcast Name is required",
              })}
              placeholder="Enter podcast name..."
              className="border border-gray-700 bg-gray-900 p-2 w-full rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
            />
            {errors.podcast_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.podcast_name.message}
              </p>
            )}
          </div>

          {/* Select AI Voice */}
          <div>
            <label className="block font-medium mb-1">Select AI Voice</label>
            <select
              {...register("ai_voice", { required: "Please select a voice" })}
              className="border border-gray-700 bg-gray-900 p-2 w-full rounded-md focus:ring-2 focus:ring-purple-500 outline-none">
              <option value="alloy">Alloy</option>
              <option value="coral">Coral</option>
              <option value="echo">Echo</option>
              <option value="fable">Fable</option>
              <option value="onyx">Onyx</option>
              <option value="nova">Nova</option>
              <option value="shimmer">Shimmer</option>
            </select>

            {errors.ai_voice && (
              <p className="text-red-500 text-sm mt-1">
                {errors.ai_voice.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Enter podcast description..."
              className="border border-gray-700 bg-gray-900 p-2 w-full rounded-md focus:ring-2 focus:ring-purple-500 outline-none resize-none"
              rows={3}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* AI Prompt */}
          <div>
            <label className="block font-medium mb-1">
              AI Prompt to Generate Podcast
            </label>
            <textarea
              {...register("ai_prompt", { required: "AI Prompt is required" })}
              placeholder="Enter AI prompt..."
              className="border border-gray-700 bg-gray-900 p-2 w-full rounded-md focus:ring-2 focus:ring-purple-500 outline-none resize-none"
              rows={3}
            />
            {errors.ai_prompt && (
              <p className="text-red-500 text-sm mt-1">
                {errors.ai_prompt.message}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() =>
              generateAIContent(getValues("ai_prompt"), getValues("ai_voice"))
            }
            className="w-full bg-purple-800 hover:bg-purple-600 transition px-4 py-2 rounded-md font-medium text-white"
            disabled={loading}>
            {loading ? "Generating..." : "Generate AI Content"}
          </button>

          {/* AI Content Display */}
          {generatedPodcast && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Generated Content</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={generatedPodcast.imageUrl}
                    alt="Generated Image"
                    className="w-32 h-32 object-cover rounded-md"
                  />
                  <audio
                    src={generatedPodcast.audioUrl}
                    controls
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Podcast Generation */}
          {generatedPodcast ? (
            <button
              type="submit"
              className="w-full bg-purple-700 hover:bg-purple-600 transition px-4 py-2 rounded-md font-medium text-white">
              Generate Podcast
            </button>
          ) : (
            <p className="text-center px-4 py-2 rounded-md font-medium text-white">
              Waiting for AI Content...
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
