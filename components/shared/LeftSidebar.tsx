import { BiLogIn,  BiSolidUserVoice} from "react-icons/bi";
import Link from "next/link";
import { getUser } from "@/app/lib/supabase";
import SidebarLinks from "./SidebarLinks";

import Logo from "./Logo";
import LogoutButton from "../buttons/LogoutButton";

const LeftSidebar = async() => {
  const user = await getUser();
  
  return (
    <div className="lg:flex hidden flex-col lg:w-80 min-h-screen">
      <Logo/>
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
          <Link
            href={`/login`}
            className="text-[#EDEDED] hover:text-purple-300 flex items-center gap-4 ml-5">
            <BiLogIn /> Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default LeftSidebar;
