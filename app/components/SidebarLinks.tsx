"use client";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "../constants";
import Link from "next/link";

const SidebarLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {sidebarLinks.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={`flex items-center gap-4 px-4 py-2 rounded-lg transition-colors ${
            pathname === href
              ? "bg-purple-600 text-white"
              : "text-[#EDEDED] hover:text-purple-300"
          }`}>
          <Icon /> {label}
        </Link>
      ))}
    </>
  );
};
export default SidebarLinks;
