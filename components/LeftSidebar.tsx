import { BiSolidUserVoice} from "react-icons/bi";
import Link from "next/link";
import { getUser } from "@/app/lib/supabase";
import SidebarLinks from "./SidebarLinks";
import LogoutButton from "./buttons/LogoutButton";
import LoginButton from "./buttons/LoginButton";

const LeftSidebar = async() => {
  const user = await getUser();

  return (
    <div>
      <div className="lg:flex gap-8 flex-col lg:w-80 hidden p-8 min-h-screen">
        <SidebarLinks />
        {user ? (
          <div className="flex flex-col gap-8">
            <Link
              href={`/profile/${user.id}`}
              className="text-[#EDEDED] hover:text-purple-300 flex items-center gap-4 ml-5">
              <BiSolidUserVoice /> My Profile
            </Link>
            <LogoutButton />
          </div>
        ) : (
          <LoginButton />
        )}
      </div>
    </div>
  );
};

export default LeftSidebar;
