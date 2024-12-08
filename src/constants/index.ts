import { HomeIcon, MessageSquarePlus, MessagesSquare } from "lucide-react";

export const NAV_ITEMS = [
  {
    label: "Home",
    href: "/home",
    icon: HomeIcon,
  },
  {
    label: "Discover",
    href: "/home/discover",
    icon: MessagesSquare,
  },
  {
    label: "Create",
    href: "/home/create",
    icon: MessageSquarePlus,
  },
];
