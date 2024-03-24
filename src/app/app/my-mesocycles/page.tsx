"use client";
import { BiDotsHorizontalRounded } from "react-icons/bi"; 

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import * as actions from "@/actions";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Mesocycle as MesocycleType } from "@/types";
import { AccordionTrigger } from "@radix-ui/react-accordion";
import Mesocycle from "@/components/Mesocycle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useToast } from "@/components/ui/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function MyMesocyclesPage() {
  const { userId } = useAuth();
  const [mesocycles, setMesocycles] = useState<MesocycleType[]>([]);
  const [isFetching, setIsFetching] = useState(true)
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  const [isActivating, setIsActivating] = useState(false)
  const {toast} = useToast()

  useEffect(() => {
    if (!userId) return;
    getMesocycles(userId)
  }, [userId]);

  function getMesocycles(userId: string){
    actions.getMesocyclesByUserId(userId).then((data) =>{
      setMesocycles(data)
      setIsFetching(false)
      setIsActivating(false)
     });
  }

  if (!userId) return;

  if(isFetching){
    return (
        <p>Loading...</p>
    )
  }

  function handleTryActivate(mesoId: string){
    if(mesocycles.some(meso => meso.isActive === true)){
      setDialogIsOpen(true)
    }else{
      activateMesocycle(mesoId)
    }
  }

  async function activateMesocycle(mesoId: string){
    const meso = mesocycles.find(m => m._id === mesoId)
    if(!meso) return
    setIsActivating(true)
    try{
      await actions.activateMesocycle(mesoId, userId!)
      toast({
        title: `Mesocycle activated!`,
        description: `${meso.title}`
      })
    }catch(err: unknown){
      console.log(err)
    }
    getMesocycles(userId!)
    setDialogIsOpen(false)
  }

  async function handleDeleteMesocycle(mesoId: string){
    if(!mesoId) return
    const meso = mesocycles.find(m => m._id === mesoId)
    if(!meso) return

    try{
      await actions.deleteMesocycle(mesoId)
      toast({
        title: 'Mesocycle deleted',
        description: meso.title
      })
      actions.getMesocyclesByUserId(userId!)
        .then(data => setMesocycles(data))
    }catch(err: unknown){
      if(err instanceof Error){
        console.log(err.message)
      }
    }
  }

  return (
    <div className='w-full max-w-[1440px] mx-auto p-3'>
      { mesocycles.length > 0 ? <Accordion type="single" collapsible className="w-full mx-auto">
        {mesocycles.map((meso) => (
          <AccordionItem key={meso._id} value={meso._id!} >
            <AccordionTrigger className='w-full text-left rounded' asChild>
                <div className='bg-muted h-[3.5rem] gap-2 p-3 mb-3 flex items-center cursor-pointer'>
                    <p className='mr-auto'>
                {meso.title}
                    </p>
                    {meso.isActive ? <p className='italic text-green-600'>(Active)</p> :
                    <Dialog open={dialogIsOpen} onOpenChange={(e) => !e && setDialogIsOpen(e)}>
                      <DialogTrigger asChild>
                    <Button className='hover:bg-green-600' onClick={() => handleTryActivate(meso._id!)} disabled={isActivating}>Activate</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Another mesocycle is already active</DialogTitle>
                          <DialogDescription>If you activate this mesocycle, data from the currently active mesocycle will be lost.</DialogDescription>
                          <DialogDescription>Do you wish to continue?</DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-around">
                          <DialogClose asChild>
                          <Button  disabled={isActivating} onClick={() => {
                            activateMesocycle(meso._id!)
                            setDialogIsOpen(false)
                            }}>Activate</Button>
                          </DialogClose>
                          <DialogClose asChild>
                          <Button variant={'destructive'} disabled={isActivating}>Cancel</Button>
                          </DialogClose>
                        </div>
                      </DialogContent>
                    </Dialog>
                    }
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                    <BiDotsHorizontalRounded />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
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
      </Accordion> : <p>You don't have any mesocycles yet. <Link href='/app/create-mesocycle'>Create one now</Link></p>}
    </div>
  );
}
