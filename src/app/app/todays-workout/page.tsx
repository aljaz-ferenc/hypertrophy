"use client";

import { Days, Mesocycle, Workout, RestTip, Set, WorkoutLog, Log, LogExercise } from "@/types";
import { useAuth } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";
import * as actions from "@/actions";
import Link from "next/link";
import { addDays, differenceInCalendarISOWeeks, isToday } from "date-fns";
import Exercise from "@/components/Exercise";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { restTips } from "@/data";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { useLogContext } from "@/context/LogContext";
import { useRouter } from "next/navigation";
import CenteredText from "@/components/CenteredText";
import Loading from "@/components/Loading";

function getTodaysDay() {
  //get days (monday = 1 ... sunday = 7)
  return [7, 1, 2, 3, 4, 5, 6][new Date().getDay()];
}

function todaysWorkout(mesocycle: Mesocycle) {
  //get workout that matches today's day
  const today = getTodaysDay();
  const todaysWorkout = mesocycle.workouts.find(
    (workout) => workout.weekDay === today
  );

  return todaysWorkout;
}

function isMesocycleCompleted(activeMeso: Mesocycle){
  // check if today's date is past the duration of mesocycle
  const startDate = new Date(activeMeso.startDate!)
  const lastDay = activeMeso.workouts.at(-1)!.weekDay-1
  const durationInDays = (activeMeso.duration - 1) * 7 + lastDay
  const endDate = addDays(startDate, durationInDays)
  const today = new Date()
  return today > endDate
}


export default function TodaysWorkoutPage() {
  const { userId } = useAuth();
  const [mesocycle, setMesocycle] = useState<Mesocycle | null | undefined>(
    undefined
    );
  const [workout, setWorkout] = useState<Workout | undefined>();
  const [isFetching, setIsFetching] = useState(true);
  const {setupLogState, exercises, setupExerciseState, log} = useLogContext()
  const [logDB, setLogDB] = useState<Log | null>(null) 
  const [workoutCompleteToday, setWorkoutCompleteToday] = useState(false)
  const [isCompleting, setIsCompleting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    //set active mesocycle and today's workout
    if (!userId) return;
    setIsFetching(true)
    actions
    .getActiveMesocycle(userId)
      .then(({meso, log, lastWorkout}: {meso: Mesocycle, log: Log, lastWorkout: Date}) => {
        if(isToday(lastWorkout)) setWorkoutCompleteToday(true)
        if(!meso) return setMesocycle(null)
        
        const workout: Workout | undefined = todaysWorkout(meso)
        setMesocycle(meso);
        setWorkout(workout);
        const exercises = workout?.exercises.map(exercise => {
          return {exercise: exercise.exercise, id: exercise.id, data: [{reps: 0, weight: 0}]}
        }) || []
        if(exercises.length > 0){
          setupExerciseState(exercises)
        }
        if(!workout) return
        setupLogState(log)
        setLogDB(log)
      })
      .finally(() => setIsFetching(false));
  }, [userId]);

  if (isFetching) {
    return <Loading/>;
  }

  if (!isFetching && mesocycle === null) {
    //if no mesocycles are active
    return (
      <div className="w-full h-screen flex justify-center items-center">
      <p>
        Currently you have no active mesocycles.{" "}
        <Link href="/app/my-mesocycles" className="link">
          Activate an existing one
        </Link>{" "}
        or{" "}
        <Link href="/app/create-mesocycle" className="link">
          create a new one.
        </Link>
      </p>
      </div>
    );
  }

  if (!mesocycle) return;

  if(isMesocycleCompleted(mesocycle)){
    return (
        <CenteredText>
      <p>You have completed the current mesocycle. <Link className='link' href={'/app/completed-mesocycles'}>Check the logs</Link> or <Link className='link' href={'/app/create-mesocycle'}>create a new mesocycle.</Link></p>
        </CenteredText>
    )
  }

  if(workoutCompleteToday){
    //if today's workout has been completed
    return (
      <CenteredText>
      <p>You have already completed today's workout.</p>
      </CenteredText>
    )
  }

  
  
  const week = differenceInCalendarISOWeeks(
    new Date(),
    new Date(mesocycle.startDate!)
    );
    
   async function handleCompleteWorkout(logId: string){
      if (!mesocycle) return;
      setIsCompleting(true)
      const workout: WorkoutLog = {
          day: getTodaysDay(),
          exercises
      }
      try{
        await actions.addWorkoutToLog(logId, workout, week, workout.day, mesocycle.user!)
        router.push('/app/completed-mesocycles')
      }catch(err: unknown){
        if(err instanceof Error){
          console.log(err.message)
        }
      }finally{
        setIsCompleting(false)
      }
    }

  return (
    <div className="max-w-[800px] w-full mx-auto p-3 ">
    <h1>Today's Workout</h1>
      {workout ? (
        <div className="flex flex-col gap-3">
          <div className="bg-muted p-3">
            <p className="text-md text-gray-400 font-semibold uppercase">
              {mesocycle.title}
            </p>
            <h2 className="text-2xl font-bold uppercase">
              Week <span className="text-3xl">{week + 1} </span>/ {mesocycle.duration} -{" "}
              {Days[workout.weekDay]}
            </h2>
            {week + 1 === mesocycle.duration && <p>Last week</p>}
          </div>
          {exercises?.map((exercise, i) => (
            <Exercise exerciseIndex={i} workoutId={workout.id} exercise={exercise} key={exercise.id} />
            ))}
          <Button disabled={isCompleting} onClick={ () => handleCompleteWorkout(logDB!._id!)}>Complete Workout</Button>
        </div>
      ) : (
        <RestDay />
      )}
    </div>
  );
}

function RestDay() {
  return (
    <div className="p-3 max-w-[1440px] mx-auto">
      <h2 className="mb-5 text-2xl font-semibold">Rest Day!</h2>
      <p className="mb-3">
        Today, there are no scheduled workouts, inviting a well-deserved rest.
        Take this opportunity to rejuvenate and recharge, ensuring you're ready
        to tackle tomorrow's challenges with renewed energy and vitality.
      </p>
      <p>
        Rest and recovery play a crucial role in achieving optimal performance
        and overall well-being within any fitness regimen. Here are some
        comprehensive tips to help you make the most of your rest days:
      </p>
      <Carousel className="max-w-[30rem] mx-auto my-10">
        <CarouselContent>
          {restTips.map((tip: RestTip, i) => (
            <CarouselItem key={i} className="h-full">
              <Card>
                <CardHeader className="text-2xl font-bold">
                  {tip.title}
                </CardHeader>
                <CardContent>{tip.description}</CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <p>Enjoy your day off!</p>
    </div>
  );
}
