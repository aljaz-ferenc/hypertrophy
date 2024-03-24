
import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerHeader,
  DrawerTrigger,
} from "./ui/drawer";
import { CircleHelp } from "lucide-react";

export default function MesocycleTips() {

  return (
    <Drawer>
      <DrawerTrigger><CircleHelp color="rgba(255, 255, 255, 0.5)"/></DrawerTrigger>
      <DrawerContent className="h-[50%]">
        <div className="pt-3 px-10 max-w-[1440px] mx-auto">
          <DrawerHeader>
            <DrawerTitle>
              <h1>Creating a Mesocycle</h1>
            </DrawerTitle>
          </DrawerHeader>

          <p className="mb-3">
            Mesocycles are an essential component of any well-rounded workout
            plan, providing structure and progression to help you achieve your
            fitness goals. A mesocycle typically spans several weeks, during
            which you focus on specific training objectives before transitioning
            to a new phase.
          </p>
          <p>
            Creating a weekly workout plan involves strategically scheduling
            your training sessions to optimize progress and balance rest and
            recovery. Here's a brief guide to help you structure your weekly
            routine:
          </p>
          <ul className="my-6 ml-6 list-none [&>li]:mt-2 flex flex-col gap-3">
            <li> 
              <h2 className="font-bold text-xl mb-2">Frequency</h2>
              Aim to exercise most days of the week, with at least 3-5 days
              dedicated to structured workouts. This frequency allows for
              sufficient stimulus to elicit adaptations while allowing for
              adequate recovery.
            </li>
            <li>
              <h2 className="font-bold text-xl mb-2">Exercise Selection</h2>
              Include a variety of exercises targeting different muscle groups
              and movement patterns to ensure balanced development and reduce
              the risk of overuse injuries. Incorporate compound exercises along
              with isolation exercises to target specific muscles.
            </li>
            <li>
              <h2 className="font-bold text-xl mb-2">Resistance Training</h2>
              Allocate 2-4 days per week for resistance training sessions,
              focusing on different muscle groups on each day. For example, you
              might have a lower body day, an upper body day, and a full-body
              day. Include both strength-focused workouts with heavier weights
              and higher-repetition hypertrophy workouts to promote muscle
              growth.
            </li>
          </ul>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
