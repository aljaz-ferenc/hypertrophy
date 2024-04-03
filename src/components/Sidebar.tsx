import React from "react";
import MobileSidebar from "./MobileSidebar";
import SidebarContent from "./SidebarContent";

export default function Sidebar() {

  return (
    <>
      <div className="md:flex hidden">
        <SidebarContent/>
      </div>
      <div className="md:hidden flex">
        <MobileSidebar/>
      </div>
    </>
  );
}
