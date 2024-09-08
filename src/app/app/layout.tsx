import Sidebar from '@/components/Sidebar';
import React from 'react'
import Timer from "@/components/Timer";

export default function AppLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
          <>
              <Timer/>
            <Sidebar/>
            {children}
          </>
    );
  }