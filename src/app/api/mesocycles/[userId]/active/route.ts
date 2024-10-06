import { NextResponse } from "next/server";
import { connectToDatabase } from "@/database/mongoose";
import Mesocycle from "@/database/models/Mesocycle";
import { addWeeks, endOfDay, isAfter, isBefore, isToday, subDays } from "date-fns";
import { getTodaysDay } from "@/lib/utils";
import { Mesocycle as MesoType } from "@/types";
import User from "@/database/models/User";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  let message: string = "";
  let meso: MesoType | null = null;
  try {
    const userId = params.userId;
    if (!userId) throw new Error("userId not found");
    await connectToDatabase();
    const mesocycle: MesoType | null = await Mesocycle.findOne({
      user: userId,
      isActive: true,
    });

    if (!mesocycle) {
      message = "noActiveMesos";
      return NextResponse.json({ message, mesocycle: meso });
    }

    const now = new Date();
    const startDate = mesocycle.startDate;
    const duration = mesocycle.duration;
    const endDate = endOfDay(subDays(addWeeks(startDate!, duration), 1));
    console.log(startDate, endDate);

    if (isBefore(now, startDate!)) {
      message = "startsMonday";
      meso = null;
    }

    if (isAfter(now, endDate)) {
      message = "mesoCompleted";
      meso = null;
    }

    if (isAfter(now, startDate!) && isBefore(now, endDate)) {
      message = "active";

      //check if rest day
      const todaysDay = getTodaysDay();
      const todaysWorkout = mesocycle.workouts.find((w) => {
        return w.weekDay === todaysDay;
      });

      if (!todaysWorkout) {
        message = "restDay";
        meso = null;
      } else {
        meso = mesocycle;
      }

       //check if workout completed today
       const user = await User.findById(userId)
       if(user?.lastWorkout){
         if(isToday(user.lastWorkout)){
           message = 'workoutCompleted'
         }
       }
    }

    return NextResponse.json({ mesocycle, message });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
}
