import Sidebar from '@/components/Sidebar';
import React from 'react'

export default function AppLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
          <>
            <Sidebar/>
            {children}
          </>
    );
  }