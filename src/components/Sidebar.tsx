"use client";

import Link from "next/link";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { UserButton } from "@clerk/nextjs";

type SidebarLink = {
  title: string;
  href: string;
};

const sidebarLinks: SidebarLink[] = [
  { title: "Today's Workout", href: "/app/todays-workout" },
  { title: "Create Mesocycle", href: "/app/create-mesocycle" },
  { title: "My Mesocycles", href: "/app/my-mesocycles" },
];

export default function Sidebar() {
  return (
    <div className="sidebar">
      {sidebarLinks.map((link, i) => (
        <Link className="sidebar-link" href={link.href} key={i}>
          {link.title}
        </Link>
      ))}
      <div className="mt-auto">
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </div>
  );
}
