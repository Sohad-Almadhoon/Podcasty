import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AiOutlineMenu } from "react-icons/ai";
import SidebarLinks from "./SidebarLinks";
import Link from "next/link";
import { BiSolidUserVoice } from "react-icons/bi";
import { getUser } from "@/app/lib/supabase";
import LogoutButton from "./buttons/LogoutButton";
import LoginButton from "./buttons/LoginButton";

const MobileNav = async () => {
  const user = await getUser();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <AiOutlineMenu className="text-white text-3xl cursor-pointer" />
      </SheetTrigger>
      <SheetContent side="left" className="border-none bg-black-1">
        <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto mt-12">
          <SheetClose asChild>
            <div className="flex gap-8 flex-col">
              <SidebarLinks />
              {user ? (
                <div className="ml-5 flex flex-col gap-8">
                  <Link
                    href={`/profile/${user.id}`}
                    className="text-[#EDEDED] hover:text-purple-300 flex items-center gap-4">
                    <BiSolidUserVoice /> My Profile
                  </Link>
                  <LogoutButton />
                </div>
              ) : (
                <LoginButton />
              )}
            </div>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
