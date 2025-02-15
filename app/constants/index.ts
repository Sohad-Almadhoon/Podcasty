import {
    AiFillHome,
    AiFillAudio,
} from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
export const sidebarLinks = [
    { href: "/", label: "Home", icon: AiFillHome },
    { href: "/podcasts", label: "Discover", icon: BiSearch  },
    { href: "/podcasts/create", label: "Create Podcast", icon: AiFillAudio  },
];