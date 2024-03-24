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
};

export default function Exercise({ exercise }: ExerciseProps) {
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
        console.log('haha')
        toast({title: 'Cannot remove all sets', description: 'Complete at least one set for each exercise.'})
        return
    }
    setSets(prev => prev.filter((set, i) => i !== index))
  }

  return (
    <div className="p-3 bg-muted p-3">
      <h3>{exercise.exercise}</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SET</TableHead>
            <TableHead>WEIGHT</TableHead>
            <TableHead>REPS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sets.map((set, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={set.weight}
                    min={1}
                    onChange={(e) =>
                      updateSet("weight", parseInt(e.target.value), index)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    min={1}
                    type="number"
                    value={set.reps}
                    onChange={(e) =>
                      updateSet("reps", parseInt(e.target.value), index)
                    }
                  />
                </TableCell>
                <TableCell>
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
