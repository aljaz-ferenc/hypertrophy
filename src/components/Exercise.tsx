import { Exercise, Set } from "@/types";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Input } from "./ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "./ui/use-toast";

type ExerciseProps = {
  exercise: Exercise;
  setLogs: React.Dispatch<React.SetStateAction<Set[]>>
};

export default function Exercise({ exercise, setLogs }: ExerciseProps) {
  const [sets, setSets] = useState<Set[]>([{ weight: 0, reps: 0 }]);
  const {toast} = useToast()

  function updateSet(field: "reps" | "weight", value: number, index: number) {
    setSets((prev) => {
      return prev.map((set, i) => {
        if (i === index)
          return field === "weight"
            ? { ...set, weight: value }
            : { ...set, reps: value };
        return set;
      });
    });
  }

  function handleRemoveSet(index: number){
    if(sets.length < 2) {
        toast({title: 'Cannot remove all sets', description: 'Complete at least one set for each exercise.'})
        return
    }
    setSets(prev => prev.filter((set, i) => i !== index))
  }

  return (
    <div className="p-3 bg-muted">
      <h3 className="uppercase font-semibold">{exercise.exercise}</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='p-1 md:p-2 lg:p-4'>SET</TableHead>
            <TableHead  className='p-1 md:p-2 lg:p-4'>WEIGHT</TableHead>
            <TableHead  className='p-1 md:p-2 lg:p-4'>REPS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sets.map((set, index) => (
              <TableRow key={index}>
                <TableCell  className='p-1 md:p-2 lg:p-4'>{index + 1}</TableCell>
                <TableCell  className='p-1 md:p-2 lg:p-4'>
                  <Input
                    type="number"
                    value={set.weight}
                    min={1}
                    onChange={(e) =>
                      updateSet("weight", parseInt(e.target.value), index)
                    }
                  />
                </TableCell>
                <TableCell  className='p-1 md:p-2 lg:p-4'>
                  <Input
                  disabled
                    min={1}
                    type="number"
                    value={set.reps}
                    onChange={(e) =>
                      updateSet("reps", parseInt(e.target.value), index)
                    }
                  />
                </TableCell>
                <TableCell  className='p-1 md:p-2 lg:p-4'>
                  <Button className='bg-green-600 hover:bg-green-500 transition font-bold'>LOG</Button>
                </TableCell>
                <TableCell  className='p-1 md:p-2 lg:p-4'>
                  <Trash2 className='text-destructive cursor-pointer hover:text-red-600 transition' onClick={() => handleRemoveSet(index)}/>
                </TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
          <Button
            onClick={() => setSets((prev) => [...prev, { weight: 0, reps: 0 }])}
          >
            ADD SET
          </Button>
    </div>
  );
}
