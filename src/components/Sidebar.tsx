"use client";

import Link from "next/link";
import React from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { Dumbbell, FilePlus, Folder } from "lucide-react";
import { usePathname } from 'next/navigation'

type SidebarLink = {
  title: string;
  href: string;
  icon: React.ReactNode
};

const sidebarLinks: SidebarLink[] = [
  { title: "Today's Workout", href: "/app/todays-workout", icon: <Dumbbell size={20}/> },
  { title: "Create Mesocycle", href: "/app/create-mesocycle", icon: <FilePlus size={20}/> },
  { title: "My Mesocycles", href: "/app/my-mesocycles", icon: <Folder size={20}/> },
  { title: "Completed Mesocycles", href: "/app/completed-mesocycles", icon: <Folder size={20}/> },
];

export default function Sidebar() {
  const pathname = usePathname()
  const {user} = useUser()

  return (
    <nav className="bg-muted md:flex flex-col min-h-full hidden">
      <ul className='flex flex-col'>
      {sidebarLinks.map((link, i) => (
        <li key={link.href} className={`${pathname.startsWith(link.href) && 'bg-background'} `}>
        <Link className="px-3 min-w-full hover:bg-slate-500 transition w-max flex gap-3 py-3" href={link.href} key={i}>
          {link.icon}
          {link.title}
        </Link>
        </li>
      ))}
      </ul>
      <div className="mt-auto flex gap-3 items-center p-3">
        <UserButton afterSignOutUrl="/sign-in" />
        <p>{user?.username || user?.firstName}</p>
      </div>
    </nav>
  );
}
