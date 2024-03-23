import React, { useState } from "react";
import { Exercise } from "@/types";
import { Reorder } from "framer-motion";
import { useMesocycleContext } from "@/context/MesocycleContext";
import { Badge } from "./ui/badge";
import { FiTrash } from "react-icons/fi";
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { exercises } from "@/data";

type DraggableExerciseProps = {
  exercise: Exercise;
  workoutId: string;
  editable?: boolean;
};

export default function DraggableExercise({
  exercise,
  workoutId,
  editable = false,
}: DraggableExerciseProps) {
  const [exercisesOpen, setExercisesOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const context = useMesocycleContext();
  if (!context) return;
  const { deleteExercise, updateExercise } = context;

  return (
    <Reorder.Item dragListener={editable} value={exercise} key={exercise.id}>
      <div
        className={`p-2 rounded bg-secondary mt-2 ${
          editable ? "cursor-grab" : ""
        }`}
        key={exercise.id}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="flex justify-between mb-2 items-center">
          <Badge className="block w-max capitalize">
            {exercise.muscleGroup}
          </Badge>
          {editable && (
            <button
              className={`text-destructive hover:text-red-600 transition ${
                isHovering ? "opacity-100" : "opacity-0"
              }`}
              onClick={() => {
                deleteExercise(exercise.id, workoutId);
              }}
            >
              <FiTrash />
            </button>
          )}
        </div>
        {exercise.exercise ? (
          <p>{exercise.exercise}</p>
        ) : (
          <>
            <p
              className="italic text-muted-foreground p-1 border border-dashed border-destructive hover:cursor-pointer"
              onClick={() => setExercisesOpen(true)}
            >
              Select an exercise
            </p>
            <CommandDialog onOpenChange={setExercisesOpen} open={exercisesOpen}>
              <CommandInput placeholder="Search..." />
              <CommandList>
                <CommandEmpty>No exercises found</CommandEmpty>
                {exercises
                  .filter((e) => e.muscleGroup === exercise.muscleGroup)
                  .map((ex) => (
                    <CommandItem
                      key={ex.exercise}
                      onSelect={() => {
                        updateExercise(workoutId, exercise.id, ex.exercise);
                        setExercisesOpen(false);
                      }}
                    >
                      {ex.exercise}
                    </CommandItem>
                  ))}
              </CommandList>
            </CommandDialog>
          </>
        )}
      </div>
    </Reorder.Item>
  );
}
