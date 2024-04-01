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

export default function RestDay() {
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
  )
}
