"use client";

import { NAV_ITEMS } from "@/constants";
import { cn } from "@/lib/utils";
import {
  ArrowLeftFromLineIcon,
  ArrowRightFromLineIcon,
  EllipsisVertical,
  LucideIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import Logo from "../common/logo";
import { Button } from "../ui/button";

const Sidebar = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const { data: session } = useSession();
  return (
    <aside className="fixed z-[9999] h-screen w-fit bg-white">
      <nav className="flex h-full flex-col border-r">
        {/* Sidebar header */}
        <div className="flex items-center px-3 pt-4">
          <div
            className={cn(
              "flex items-center overflow-hidden transition-all",
              expanded ? "w-32" : "w-0",
            )}
          >
            <div className="relative size-10">
              <Logo className="relative" />
            </div>
            <span className={cn("text-xl font-bold")}>Discover</span>
          </div>
          <Button
            size="icon"
            className="ml-auto size-8"
            variant="secondary"
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? <ArrowLeftFromLineIcon /> : <ArrowRightFromLineIcon />}
          </Button>
        </div>

        {/* Sidebar content */}
        <ul className="my-4 flex-1">
          {NAV_ITEMS.map((item, index) => (
            <SidebarItem
              key={index}
              item={item}
              expanded={expanded}
              setExpanded={setExpanded}
            />
          ))}
        </ul>

        {/* Sidebar footer */}
        <div className="p-3">
          <div
            className={cn(
              "flex items-center",
              expanded ? "rounded-md border p-2" : "",
            )}
          >
            <div className="relative size-8">
              <span className="absolute -bottom-0.5 -right-0.5 inline-block size-2 rounded-full bg-green-500" />
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="Discover"
                  width={32}
                  height={32}
                  className="rounded-md"
                />
              ) : (
                <div className="flex items-center justify-center rounded-md">
                  {session?.user?.name[0].toUpperCase() ?? "X"}
                </div>
              )}
            </div>
            <div
              className={cn(
                "flex items-center overflow-hidden transition-all",
                expanded ? "w-44" : "w-0",
              )}
            >
              <span className="ml-auto mr-2 truncate text-sm font-medium text-black/60">
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
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
}

function SidebarItem({
  expanded,
  setExpanded,
  item: { label, href, icon: Icon },
}: SidebarItemProps) {
  const pathname = usePathname();
  const isActive =
    pathname.split("/")[pathname.split("/").length - 1] === label.toLowerCase();
  console.log(label, " : ", isActive);

  return (
    <li className="group relative my-2 px-1">
      {!expanded && (
        <span className="pointer-events-none absolute left-16 mt-2 flex w-[80px] -translate-x-6 items-center justify-center rounded-lg border bg-gradient-to-r from-brand-red to-brand-orange p-1 text-start text-xs text-white opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-50">
          {label}
        </span>
      )}
      <Link
        onClick={() => {
          if (expanded) setExpanded(false);
        }}
        href={href}
        className={cn(
          "flex items-center rounded-lg px-3 py-1",
          isActive
            ? "bg-gradient-to-r from-brand-red to-brand-orange text-white/90"
            : "text-black/70 hover:bg-black/5",
        )}
      >
        <Icon strokeWidth={1} />
        <span
          className={cn(
            "overflow-hidden transition-all",
            expanded ? "ml-3 w-32" : "w-0",
          )}
        >
          {label}
        </span>
      </Link>
    </li>
  );
}
