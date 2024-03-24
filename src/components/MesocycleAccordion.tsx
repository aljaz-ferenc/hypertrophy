import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
import { Mesocycle as MesocycleType } from "@/types";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { Button } from "./ui/button";
import Mesocycle from "./Mesocycle";
import React from "react";

  type MesocycleAccordionProps = {
    mesocycles: MesocycleType[]
    handleDeleteMesocycle: (mesoId: string) => void
    handleTryActivate: (mesoId: string) => void
    activateMesocycle: (mesoId: string) => void
    dialogIsOpen: boolean
    setDialogIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    isActivating: boolean
  }

export default function MesocycleAccordion({mesocycles, handleDeleteMesocycle, handleTryActivate, activateMesocycle, dialogIsOpen, setDialogIsOpen, isActivating}: MesocycleAccordionProps) {
  return (
    <>
    <Accordion type="single" collapsible className="w-full mx-auto">
    {mesocycles.map((meso) => (

        <AccordionItem className='w-full max-w-full' key={meso._id} value={meso._id!}>
            <AccordionTrigger>
                <div className='flex w-full gap-2'>
                {meso.title}
                {meso.isActive ? <p className='italic text-green-600'>(Active)</p> :
                    <Dialog open={dialogIsOpen} onOpenChange={(e) => !e && setDialogIsOpen(e)}>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Another mesocycle is already active</DialogTitle>
                          <DialogDescription>If you activate this mesocycle, data from the currently active mesocycle will be lost.</DialogDescription>
                          <DialogDescription>Do you wish to continue?</DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                
                    }
                    <DropdownMenu >
                       <DropdownMenuTrigger className='ml-auto'>
                     <BiDotsHorizontalRounded className='mr-3'/>
                       </DropdownMenuTrigger>
                       <DropdownMenuContent >
                         <DropdownMenuItem>
                           <Button className='w-full'    disabled={isActivating} onClick={() => {
                            activateMesocycle(meso._id!)
                            setDialogIsOpen(false)
                            }}>Activate</Button>
                         </DropdownMenuItem>
                         <DropdownMenuItem>
                           <Button className='w-full' onClick={() => handleDeleteMesocycle(meso._id!)} variant={'destructive'}>Delete</Button>
                         </DropdownMenuItem>
                       </DropdownMenuContent>
                     </DropdownMenu>
                </div>
            </AccordionTrigger>
            <AccordionContent>
               <Mesocycle workouts={meso.workouts} />
             </AccordionContent>
        </AccordionItem>
        ))}
      </Accordion>
      </>
  )
}
