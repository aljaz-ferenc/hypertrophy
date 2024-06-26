'use client'

import Mesocycle from "@/components/Mesocycle";
import WorkoutDayForm from "@/components/WorkoutDayForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useMesocycleContext } from "@/context/MesocycleContext";
import { weekdays } from "@/data";
import { Mesocycle as MesocycleType } from "@/types";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import * as actions from "@/actions";
import { useAuth } from "@clerk/nextjs";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import MesocycleTips from "@/components/MesocycleTips";

export default function CreateMesocycle() {
    const [title, setTitle] = useState("");
    const [duration, setDuration] = useState("4");
    const [units, setUnits] = useState<"kg" | "lb">("kg");
    const [error, setError] = useState("");
    const [disabled, setDisabled] = useState(true);
    const { userId } = useAuth();
    const { toast } = useToast();
    const router = useRouter();
    const context = useMesocycleContext();
    const { workouts, addWorkout, resetWorkouts } = context || {};
    
    async function createMesocycle() {
      if(!workouts || !userId || !resetWorkouts) return
      if (!title) return setError("Please choose a name");
      const newMesocycle: MesocycleType = {
        title,
        duration: parseInt(duration),
        units,
        workouts,
      };
      // if (!userId) return;
      try {
        await actions.createMesocycle(newMesocycle, userId);
        toast({
          title: "Mesocycle created",
          description: `${title}`,
        });
        router.push("my-mesocycles");
        resetWorkouts()
      } catch (err: unknown) {
        toast({
          title: "Error",
          description: 'Something went wrong creating a mesocycle...',
        });
        return console.log(err);
      }
    }
  
    useEffect(() => {
      if(!workouts) return
      workouts.forEach((workout) => {
        if (
          workout.exercises.length === 0 ||
          !workout.weekDay ||
          workout.exercises.some((ex) => !ex.exercise)
        ) {
          setDisabled(true);
        } else {
          setDisabled(false);
        }
      });
    }, [workouts]);

  return (
    <div>
        <div className="flex flex-col gap-10 w-fit">
        <div className="relative">
          <Label htmlFor="title">Mesocycle Name</Label>
          <Input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError("");
            }}
            id="name"
          />
          {error && (
            <small className="text-destructive absolute italic">{error}</small>
          )}
        </div>
        <div>
          <Label htmlFor="title">
            Select a duration for the mesocycle (in weeks)
          </Label>
          <ToggleGroup
            onValueChange={(duration) => setDuration(duration)}
            defaultValue={duration}
            type="single"
          >
            <ToggleGroupItem className="w-full" value="4">
              4
            </ToggleGroupItem>
            <ToggleGroupItem className="w-full" value="6">
              6
            </ToggleGroupItem>
            <ToggleGroupItem className="w-full" value="8">
              8
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div>
          <Label htmlFor="title">Select units for weights</Label>
          <ToggleGroup
            onValueChange={(units: "kg" | "lb") => setUnits(units)}
            defaultValue={units}
            type="single"
          >
            <ToggleGroupItem className="w-full" value="kg">
              KG
            </ToggleGroupItem>
            <ToggleGroupItem className="w-full" value="lb">
              LB
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      <Separator className="my-10" />
        {addWorkout && workouts && workouts.length < weekdays.length && (
          <Button
            onClick={() => addWorkout()}
            variant="outline"
            type="button"
            className="flex w-[10rem] items-center gap-2 py-5 mb-3 px-14 "
          >
            <AiOutlinePlus />
            <p className="w-max">Add Day</p>
          </Button>
        )}
      {addWorkout && workouts && <div className="flex gap-3 pb-3 overflow-x-auto custom-scrollbar">
        <Mesocycle editable={true} workouts={workouts!} />
      </div>}
      <Button
        className="mt-10"
        disabled={disabled}
        onClick={() => createMesocycle()}
      >
        Create Mesocycle
      </Button>
    </div>
  )
}
