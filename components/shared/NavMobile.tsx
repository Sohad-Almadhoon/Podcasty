import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AiOutlineMenu } from "react-icons/ai";
import SidebarLinks from "./SidebarLinks";
import Link from "next/link";
import { BiLogIn, BiSolidUserVoice } from "react-icons/bi";
import { getUser } from "@/app/lib/supabase";
import LogoutButton from "../buttons/LogoutButton";
import { VisuallyHidden} from '@radix-ui/react-visually-hidden';

const MobileNav = async () => {
  const user = await getUser();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <AiOutlineMenu className="text-white text-3xl cursor-pointer" />
      </SheetTrigger>
      <SheetContent side="left" className="border-none bg-black-1 w-96">
        <SheetTitle className="hidden">
        <VisuallyHidden>Menu</VisuallyHidden>
        </SheetTitle>
        <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto mt-12">
          <SheetClose asChild>
            <div className="flex gap-8 flex-col">
              <SidebarLinks />
              {user ? (
                <div className="flex flex-col gap-8 ml-5">
                  <Link
                    href={`/profile/${user.id}`}
                    className="text-[#EDEDED] hover:text-purple-300 flex items-center gap-4">
                    <BiSolidUserVoice /> My Profile
                  </Link>
                  <LogoutButton />
                </div>
              ) : (
                <Link
                  href={`/login`}
                  className="text-[#EDEDED] hover:text-purple-300 flex items-center gap-4">
                  <BiLogIn /> Login
                </Link>
              )}
            </div>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
