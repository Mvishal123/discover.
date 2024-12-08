"use client";

import { cn } from "@/lib/utils";
import {
  ArrowLeftFromLineIcon,
  ArrowRightFromLineIcon,
  EllipsisVertical,
  LucideIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRef, useState } from "react";
import Logo from "../common/logo";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import path from "path";
import Link from "next/link";
import { NAV_ITEMS } from "@/constants";

const Sidebar = () => {
  const [expanded, setExpanded] = useState<boolean>(true);
  const { data: session } = useSession();
  return (
    <aside className="h-screen w-fit">
      <nav className="h-full border-r flex flex-col">
        {/* Sidebar header */}
        <div className="px-3 pt-4 flex items-center">
          <div
            className={cn(
              "flex items-center transition-all overflow-hidden",
              expanded ? "w-32" : "w-0"
            )}
          >
            <div className="relative size-10">
              <Logo className="relative" />
            </div>
            <span className={cn("font-bold text-xl")}>Discover</span>
          </div>
          <Button
            size="icon"
            className="size-8 ml-auto"
            variant="secondary"
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? <ArrowLeftFromLineIcon /> : <ArrowRightFromLineIcon />}
          </Button>
        </div>

        {/* Sidebar content */}
        <ul className="flex-1 my-4">
          {NAV_ITEMS.map((item, index) => (
            <SidebarItem key={index} item={item} expaned={expanded} />
          ))}
        </ul>

        {/* Sidebar footer */}
        <div className="p-3">
          <div
            className={cn(
              "flex items-center",
              expanded ? "border p-2 rounded-md" : ""
            )}
          >
            <div className="size-8 relative">
              <span className="inline-block size-2 bg-green-500 rounded-full absolute -bottom-0.5 -right-0.5" />
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="Discover"
                  width={32}
                  height={32}
                  className="rounded-md"
                />
              ) : (
                <div className="rounded-md flex items-center justify-center">
                  {session?.user?.name[0].toUpperCase() ?? "X"}
                </div>
              )}
            </div>
            <div
              className={cn(
                "transition-all overflow-hidden flex items-center",
                expanded ? "w-44" : "w-0"
              )}
            >
              <span className="text-sm font-medium text-black/60 ml-auto mr-2 truncate">
                {session?.user.username}
              </span>
              <Button variant="ghost" size="icon">
                <EllipsisVertical />
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;

interface SidebarItemProps {
  item: {
    label: string;
    href: string;
    icon: LucideIcon;
  };
  expaned: boolean;
}

function SidebarItem({
  expaned,
  item: { label, href, icon: Icon },
}: SidebarItemProps) {
  const pathname = usePathname();
  const isActive =
    pathname.split("/")[pathname.split("/").length - 1] === label.toLowerCase();
  console.log(label, " : ", isActive);

  return (
    <li className="px-1 my-2">
      <Link
        href={href}
        className={cn(
          "px-3 py-1 flex rounded-lg items-center",
          isActive
            ? "bg-gradient-to-r from-brand-red to-brand-orange  text-white/90"
            : "text-black/70 hover:bg-black/10"
        )}
      >
        <Icon strokeWidth={1} />
        <span
          className={cn(
            "transition-all overflow-hidden",
            expaned ? "ml-3 w-32" : "w-0"
          )}
        >
          {label}
        </span>
      </Link>
    </li>
  );
}
