import { LogExercise, Set, WorkoutLog } from "@/types";
import React, { useEffect, useState } from "react";
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
import { Check, Trash2 } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { useAuth } from "@clerk/nextjs";
import { useLogContext } from "@/context/LogContext";

type ExerciseProps = {
  exercise: LogExercise;
  workoutId: string
  exerciseIndex: number
};

export default function Exercise({ exercise, workoutId, exerciseIndex }: ExerciseProps) {
  const [sets, setSets] = useState<
    Set[]
  >([{ weight: 0, reps: 0}]);
  const { toast } = useToast();
  const {addSetToExercise} = useLogContext()

  function handleAddSet(){
    addSetToExercise(exercise.id!)
  }

  return (
    <div className="p-3 bg-muted">
      <h3 className="uppercase font-semibold">{exercise.exercise}</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="p-1 md:p-2 lg:p-4">SET</TableHead>
            <TableHead className="p-1 md:p-2 lg:p-4">WEIGHT</TableHead>
            <TableHead className="p-1 md:p-2 lg:p-4">REPS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exercise.data.map((set, index) => (
            <SetComponent
            exercise={exercise}
            workoutId={workoutId}
            exerciseIndex={exerciseIndex}
            key={index}
              index={index}
              set={set}
              setSets={setSets}
              sets={exercise.data}
              />
              ))}
        </TableBody>
      </Table>
      <Button
        onClick={handleAddSet}
      >
        ADD SET
      </Button>
    </div>
  );
}

type SetComponentProps = {
  index: number;
  set: Set;
  setSets: React.Dispatch<
    React.SetStateAction<Set[]>
  >;
  sets: Set[];
  workoutId: string
  exerciseIndex: number
  exercise: LogExercise
};

function SetComponent({ index, set, setSets, exercise, sets, workoutId, exerciseIndex }: SetComponentProps) {
  const { toast } = useToast();
  const [logged, setLogged] = useState(false);
  const {userId} = useAuth()
  const [reps, setReps] = useState<number>(0)
  const [weight, setWeight] = useState<number>(0)
  const {addExerciseLog, removeSet, updateSetData} = useLogContext()

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

  function handleRemoveSet(index: number) {
    if (sets.length < 2) {
      toast({
        title: "Cannot remove all sets",
        description: "Complete at least one set for each exercise.",
      });
      return;
    }
    removeSet(exercise.id!, index)
  }

  function handleLogSet(){
    // const newExercise = {
    //   exercise: exercise.exercise,
    //   id: exercise.id,
    //   data: [{
    //     reps: set.reps,
    //     weight: set.weight
    //   }]
    // }
    // addExerciseLog(newExercise)
    setLogged(true)
  }

  function handleInputChange(data: {reps: number, weight: number}){
    updateSetData(exercise.id!, index, data)
  }

  return (
    <TableRow key={index}>
      <TableCell className="p-1 md:p-2 lg:p-4">{index + 1}</TableCell>
      <TableCell className="p-1 md:p-2 lg:p-4">
        <Input
          disabled={logged}
          type="number"
          value={set.weight}
          min={1}
          onChange={(e) => handleInputChange({weight: +e.target.value, reps: set.reps})}
        />
      </TableCell>
      <TableCell className="p-1 md:p-2 lg:p-4">
        <Input
          disabled={logged}
          min={1}
          type="number"
          value={set.reps}
          onChange={(e) => handleInputChange({reps: +e.target.value, weight: set.weight})}
        />
      </TableCell>
      {/* <TableCell className="p-1 md:p-2 lg:p-4">
        {logged ? (
          <Check />
        ) : (
          <Button
            onClick={handleLogSet}
            className="bg-green-600 hover:bg-green-500 transition font-bold"
          >
            LOG
          </Button>
        )}
      </TableCell> */}
      <TableCell className="p-1 md:p-2 lg:p-4">
        {!logged && <Trash2
          className="text-destructive cursor-pointer hover:text-red-600 transition"
          onClick={() => handleRemoveSet(index)}
        />}
      </TableCell>
    </TableRow>
  )
}
