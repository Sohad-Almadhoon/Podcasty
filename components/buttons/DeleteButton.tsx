import { AiFillDelete } from "react-icons/ai";
import { deletePodcast } from "@/app/actions/server/podcast.action";

interface DeleteButtonProps {
  podcastId: string;
}

const DeleteButton = ({ podcastId }: DeleteButtonProps) => {
  return (
    <form action={deletePodcast} method="POST">
      <input type="hidden" name="podcastId" value={podcastId} />
      <button
        type="submit"
        className="mt-3 p-2 absolute top-5 right-5 bg-purple-500 text-white rounded-full flex items-center gap-1 hover:bg-red-700">
        <AiFillDelete />
      </button>
    </form>
  );
};

export default DeleteButton;
