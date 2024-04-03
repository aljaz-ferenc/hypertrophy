"use client";

import { usePathname } from "next/navigation";
import { Dumbbell, FilePlus, Folder, ClipboardCheck } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

type SidebarLink = {
  title: string;
  href: string;
  icon: React.ReactNode;
};

const sidebarLinks: SidebarLink[] = [
  {
    title: "Today's Workout",
    href: "/app/todays-workout",
    icon: <Dumbbell size={20} />,
  },
  {
    title: "Create Mesocycle",
    href: "/app/create-mesocycle",
    icon: <FilePlus size={20} />,
  },
  {
    title: "My Mesocycles",
    href: "/app/my-mesocycles",
    icon: <Folder size={20} />,
  },
  {
    title: "Completed Workouts",
    href: "/app/completed-mesocycles",
    icon: <ClipboardCheck size={20} />,
  },
];

type SidebarContentProps ={
    onOpenChange?: (val: boolean) => void
}

export default function SidebarContent({onOpenChange}: SidebarContentProps) {
  const pathname = usePathname();
  const { user } = useUser();



  return (
    <nav className="bg-background md:bg-muted flex flex-col min-h-full md:max-w-[18rem] md:p-3">
      <div className="w-full overflow-hidden md:mb-3">
        <img
          src={"/logo.svg"}
          alt="hypertrophy logo"
          className="w-full scale-150"
        />
      </div>
      <ul className="flex flex-col">
        {sidebarLinks.map((link, i) => (
          <li
            key={link.href}
            className={`rounded overflow-hidden ${
              pathname.startsWith(link.href) && "bg-background"
            }`}
          >
            <Link
              className="px-3 min-w-full hover:bg-slate-500 transition w-max flex gap-3 py-3"
              onClick={() => onOpenChange && onOpenChange(false)}
              href={link.href}
              key={i}
            >
              {link.icon}
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex gap-3 items-center p-3">
        <UserButton afterSignOutUrl="/sign-in" />
        <p>{user?.username}</p>
      </div>
    </nav>
  );
}
