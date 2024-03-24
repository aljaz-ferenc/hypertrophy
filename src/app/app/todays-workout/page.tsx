"use client";

import { Days, Mesocycle, Workout, RestTip, Set } from "@/types";
import { useAuth } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";
import * as actions from "@/actions";
import Link from "next/link";
import { differenceInCalendarISOWeeks } from "date-fns";
import Exercise from "@/components/Exercise";
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


export default function TodaysWorkoutPage() {
  const { userId } = useAuth();
  const [mesocycle, setMesocycle] = useState<Mesocycle | null | undefined>(
    undefined
    );
  const [workout, setWorkout] = useState<Workout | undefined>();
  const [isFetching, setIsFetching] = useState(true);
  const [logs, setLogs] = useState<Set[]>([])

  useEffect(() => {
    //set active mesocycle and today's workout
    if (!userId) return;
    actions
    .getActiveMesocycle(userId)
      .then((meso) => {
        setMesocycle(meso);
        setWorkout(todaysWorkout(meso));
      })
      .finally(() => setIsFetching(false));
  }, [userId]);

  if (isFetching) {
    return <p>Loading...</p>;
  }

  if (!isFetching && mesocycle === null) {
    //if no mesocycles are active
    return (
      <p>
        Currently you have no active mesocycles.{" "}
        <Link href="/app/my-mesocycles" className="text-blue-600 underline">
          Activate and existing one
        </Link>{" "}
        or{" "}
        <Link href="/app/create-mesocycle" className="text-blue-600 underline">
          create a new one.
        </Link>
      </p>
    );
  }

  if (!mesocycle) return;

    function updateLogs(){
      console.log(logs)
    }

  const week = differenceInCalendarISOWeeks(
    new Date(),
    new Date(mesocycle.startDate!)
  );



  return (
    <>
      {workout ? (
        <div className="max-w-[800px] w-full mx-auto p-3 flex flex-col gap-3">
          <div className="bg-muted p-3">
            <p className="text-md text-gray-400 font-semibold uppercase">
              {mesocycle.title}
            </p>
            <h2 className="text-2xl font-bold uppercase">
              Week <span className="text-3xl">{week + 1}</span> -{" "}
              {Days[workout.weekDay]}
            </h2>
          </div>
          {workout?.exercises.map((exercise) => (
            <Exercise updateLogs={updateLogs} exercise={exercise} key={exercise.id} />
          ))}
        </div>
      ) : (
        <RestDay />
      )}
    </>
  );
}

function RestDay() {
  return (
    <div className="p-3 max-w-[1440px] mx-auto">
      <h1 className="mb-5">Rest Day!</h1>
      <p className="mb-3">
        Today, there are no scheduled workouts, inviting a well-deserved rest.
        Take this opportunity to rejuvenate and recharge, ensuring you're ready
        to tackle tomorrow's challenges with renewed energy and vitality.
      </p>
      <p className="mb-10">
        Rest and recovery play a crucial role in achieving optimal performance
        and overall well-being within any fitness regimen. Here are some
        comprehensive tips to help you make the most of your rest days:
      </p>
      <Carousel className="max-w-[30rem] mx-auto">
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
