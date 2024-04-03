'use client'

import React, { useState } from 'react'
import Sidebar from './Sidebar'
import { Sheet, SheetTrigger,SheetContent, SheetDescription, SheetClose } from './ui/sheet'
import { Menu } from 'lucide-react'
import SidebarContent from './SidebarContent'

export default function MobileSidebar() {
    const [open, setOpen] = useState(false)

    function onOpenChnage(val: boolean){
        setOpen(val)
    }

  return (
    <div className='md:hidden'>
    <Sheet open={open} onOpenChange={(value) => setOpen(value)}>
        <SheetTrigger>
            <Menu className='absolute top-3 left-3'/>
        </SheetTrigger>
        <SheetContent side='left' className='p-2 m-0'>
            <SidebarContent onOpenChange={onOpenChnage}/>
        </SheetContent>
    </Sheet>
    </div>
  )
}
