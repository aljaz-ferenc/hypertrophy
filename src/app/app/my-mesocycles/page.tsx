"use client";

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

export default function MyMesocyclesPage() {
  const { userId } = useAuth();
  const [mesocycles, setMesocycles] = useState<MesocycleType[]>([]);
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    if (!userId) return;

    actions.getMesocyclesByUserId(userId).then((data) =>{
         setMesocycles(data)
         setIsFetching(false)
        });
  }, []);

  if (!userId) return;

  if(isFetching){
    return (
        <p>Loading...</p>
    )
  }

  return (
    <div className='w-full p-3'>
      { mesocycles.length > 0 ? <Accordion type="single" collapsible className="w-full max-w-[1440px] mx-auto">
        {mesocycles.map((meso) => (
          <AccordionItem key={meso._id} value={meso._id!}>
            <AccordionTrigger className='w-full text-left' asChild>
                <div className='bg-muted p-3 mb-3 flex justify-between items-center cursor-pointer'>
                    <p>
                {meso.title}
                    </p>
                    <Button variant={'destructive'}>Delete</Button>
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
