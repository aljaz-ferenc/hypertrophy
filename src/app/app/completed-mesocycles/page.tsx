'use client'

import * as actions from "@/actions";
import {
  Accordion,
  AccordionTrigger,
  AccordionItem,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Days, Log } from "@/types";
import { useAuth } from "@clerk/nextjs";
import { Ellipsis } from "lucide-react";
import {Fragment, useEffect, useState} from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CenteredText from "@/components/CenteredText";
import Loading from "@/components/Loading";


export default function CompletedMesocyclesPage() {
  const {userId} = useAuth()
  const [logs, setLogs] = useState<Log[]>([])
  const [isFetching, setIsFetching] = useState(true)
  
    useEffect(() => {
      if(!userId) return
      setIsFetching(true)
      actions.getLogs(userId)
        .then(data => setLogs(data))
        .catch(err => console.log(err.message))
        .finally(() => setIsFetching(false))
    }, [userId])

    if(isFetching){
      return (
        <Loading/>
      )
    }

    if(logs.length === 0){
      return (
        <main className='w-full h-screen'>
        <CenteredText>You have not yet completed any workouts.</CenteredText>
        </main>
      )
    }

    return (
      <main className="w-full max-w-[1440px] mx-auto p-3 overflow-auto">
        <h1>Completed Mesocycles</h1>
        {logs.length > 0 && <Accordion className='max-w-full overflow-auto' type="single" collapsible>
          {logs.length > 0 ? logs.map((log) => (
            <div key={log._id}>
              {log.weeks.length > 0 && (
                <AccordionItem key={log._id} value={log._id!} >
                  <AccordionTrigger >
                    {log.mesoTitle}
                    </AccordionTrigger>
                  <AccordionContent>
                    <Table>
                      <TableBody>
                        {log.weeks.map((week, index) => (
                          <Fragment key={index}>
                          {week.workouts.length > 0 && 
                          <TableRow key={index}>
                            <TableCell   className="text-2xl font-bold">
                              Week {index + 1}
                            </TableCell>
                            
                            {week.workouts.map((workout, i) => (
                              <Fragment key={i}>
                              {workout && <TableCell key={i} className="align-top">
                                <WorkoutTable workout={workout} />
                              </TableCell>}
                              </Fragment>
                            ))}
                            
                          </TableRow>}
                            </Fragment>
                        ))}
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>
              )}
            </div> 
          )): <p>You have not completed any mesocycles yet.</p>}
        </Accordion>}
      </main>
    );
  
}

function WorkoutTable({ workout }: any) {
  return (
    <div className="border rounded p-3">
      <p className="uppercase font-semibold">{Days[workout?.day]}</p>
      {workout.exercises?.map((ex: Exercise, i: number) => (
        <Table key={i}>
          <TableHeader>
            <TableRow>
              <TableHead className="w-full">{ex.exercise}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-none">
              <TableCell>Reps</TableCell>
              {ex.data.map((d, i) => (
                <TableCell key={i}>{d.reps}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>Weight</TableCell>
              {ex.data.map((d, i) => (
                <TableCell key={i}>{d.weight}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      ))}
    </div>
  );
}

type Exercise = {
  exercise: string;
  data: {
    reps: number;
    weight: number;
  }[];
};
