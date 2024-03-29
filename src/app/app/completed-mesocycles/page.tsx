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
import {Fragment} from 'react'

export default async function CompletedMesocyclesPage() {
  {
    const logs: Log[] = await actions.getLogs();

    return (
      <main className="w-full max-w-[1440px] mx-auto p-3 overflow-auto">
        <h1>Completed Mesocycles</h1>
        <Accordion className='max-w-full overflow-auto' type="single" collapsible>
          {logs.length > 0 ? logs.map((log) => (
            <div key={log._id}>
              {log.weeks.length > 0 && (
                <AccordionItem key={log._id} value={log._id!}>
                  <AccordionTrigger>{log.mesoTitle}</AccordionTrigger>
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
        </Accordion>
      </main>
    );
  }
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
