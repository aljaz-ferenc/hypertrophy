import Sidebar from '@/components/Sidebar';
import React from 'react'

export default function AppLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
            <div className='flex h-full w-full'> 
            <Sidebar/>
            {children}
             </div>
    );
  }