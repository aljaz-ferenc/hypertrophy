import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMesocycleContext } from "@/context/MesocycleContext";
import { Exercise, MuscleGroup, Weekday, Workout } from "@/types";
import { weekdays, muscleGroups, exercises } from "@/data";
import { AiOutlinePlus } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import {Reorder} from 'framer-motion'
import DraggableExercise from "./DraggableExercise";

type WorkoutDayFormProps = {
  workout: Workout;
  workouts: Workout[]
  editable: boolean
};

export default function WorkoutDayForm({ workout, workouts, editable }: WorkoutDayFormProps) {
  const context = useMesocycleContext();
  if (!context) return;
  const { setWeekDay, deleteWorkout, addExercise, reorderExercises } = context;
  

  return (
    <div key={workout.id} className="rounded border border-border p-3 min-w-[15rem]"> 
      {editable ? <div className="flex justify-between bg-muted p-3 w-[20rem] rounded">
        <Select
          onValueChange={(value: Weekday) => {
            setWeekDay(value, workout.id);
          }}
        >
          <SelectTrigger className="font-bold capitalize">
            <SelectValue placeholder="Select day..." />
          </SelectTrigger>
          <SelectContent>
            {weekdays.map((weekday) => (
              <SelectItem className="capitalize" key={weekday} value={weekday}>
                {weekday}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {workouts.length > 1 && <DropdownMenu>
          <DropdownMenuTrigger>
            <BiDotsHorizontalRounded size={20} className="ml-2" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => deleteWorkout(workout.id)}
              >
                Delete Day
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>}
      </div> : (
        <p className="capitalize">{workout.weekDay}</p>
      )}
      <div>
        <Reorder.Group values={workout.exercises} onReorder={(reorderedExercises: Exercise[]) => editable && reorderExercises(workout.id, reorderedExercises)}>
        {workout.exercises &&
          workout.exercises.map((exercise) => (
            <DraggableExercise editable={editable} key={exercise.id} exercise={exercise} workoutId={workout.id}/>
          ))}
          </Reorder.Group>
      </div>
      {editable && <div>
        <Dialog>
          <DialogTrigger className="w-full mt-2" asChild>
            <Button
            disabled={!workout.weekDay}
              type="button"
              variant='outline'
              className="flex w-full items-center gap-2 py-8 px-5"
            >
              <AiOutlinePlus />
              <p>Add a muscle group</p>
            </Button>
          </DialogTrigger>
          <DialogContent className='bg-popover'>
            <DialogHeader>
              <DialogTitle>Select a muscle group</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-2">
              {muscleGroups.map((muscleGroup: MuscleGroup) => (
                <DialogClose key={muscleGroup} asChild>
                  <Button
                  variant='outline'
                    onClick={() => {
                        console.log('click')
                        addExercise(muscleGroup, workout.id)
                    }}
                    className="w-full"
                    type="button"
                  >
                    {muscleGroup.toUpperCase()}
                  </Button>
                </DialogClose>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>}
    </div>
  );
}
