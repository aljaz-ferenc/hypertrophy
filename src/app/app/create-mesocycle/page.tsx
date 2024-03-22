"use client";

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
import * as actions from '@/actions'
import { useAuth } from "@clerk/nextjs";

export default function CreateMesocyclePage() {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("4");
  const [units, setUnits] = useState<"kg" | "lb">("kg");
  const [error, setError] = useState('')
  const [disabled, setDisabled] = useState(true)
  const {userId} = useAuth()
  
  const context = useMesocycleContext();
  if (!context) return;
  const { workouts, addWorkout, setWeekDay, deleteWorkout } = context;


  async function createMesocycle(){
    if(!title) return setError('Please choose a name')
    const newMesocycle: MesocycleType = {
      title,
      duration: parseInt(duration),
      units,
      workouts,
    }
    if(!userId) return
    await actions.createMesocycle(newMesocycle, userId)
  }

  useEffect(() => {
    console.log(workouts)
    workouts.forEach(workout => {
      if(workout.exercises.length === 0 || !workout.weekDay || workout.exercises.some(ex => !ex.exercise)){
        setDisabled(true)
      }else{
        setDisabled(false)
      }
    })
  }, [workouts])

  return (
    <div className="p-3 overflow-hidden w-full">
      <div className="flex flex-col gap-10 w-fit">
        <div className='relative'>
          <Label htmlFor="title">Mesocycle Name</Label>
          <Input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              if(error) setError('')
            }}
            id="name"
          />
          {error && <small className='text-destructive absolute italic'>{error}</small>}
        </div>
        <div>
          <Label htmlFor="title">Select a duration for the mesocycle (in weeks)</Label>
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
      <Separator className='my-10'/>
      <div className="flex gap-3 pb-3 overflow-x-auto custom-scrollbar">
        <Mesocycle workouts={workouts}/>
        {workouts.length < weekdays.length && (
          <Button
            onClick={() => addWorkout()}
            variant='outline'
            type="button"
            className="flex w-[10rem] items-center gap-2 py-5 px-14 "
          >
            <AiOutlinePlus />
            <p className="w-max">Add Day</p>
          </Button>
        )}
      </div>
      
      <Button className='mt-10' disabled={disabled} onClick={() => createMesocycle()}>Create Mesocycle</Button>
    </div>
  );
}
