"use server";

import { Document, ObjectId } from "mongoose";
import User from "./database/models/User";
import NutritionModel from './database/models/Nutrition'
import { connectToDatabase } from "./database/mongoose";
import { Days, Log as LogType, Mesocycle as MesocycleType, Set, Workout, WorkoutLog, User as UserType, Nutrition } from "./types";
import Mesocycle from "./database/models/Mesocycle";
import {differenceInWeeks, endOfWeek, previousMonday, startOfDay, startOfToday, startOfTomorrow, startOfYesterday, startOfWeek} from 'date-fns'
import Log from "./database/models/Log";
import { redirect } from "next/navigation";

export async function createUser(user: any) {
  try {
    await connectToDatabase();
    const newUser: Document = await User.create(user);
    console.log("newUser: ", newUser);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();
    const deletedUser = await User.findOneAndDelete({ clerkId });
    console.log("deletedUser: ", deletedUser);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
}

export async function updateUser(user: any) {
  try {
    await connectToDatabase();
    const updatedUser = await User.findOneAndUpdate(
      { clerkId: user.clerkId },
      user
    );
    console.log("updatedUser: ", updatedUser);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
}

export async function createMesocycle(
  mesocycle: MesocycleType,
  clerkId: string
) {
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId });
    const newMesocycle = { ...mesocycle, user: user._id };
    await Mesocycle.create(newMesocycle);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
}

export async function getMesocyclesByUserId(clerkId: string) {
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId });
    const mesocycles = await Mesocycle.find({ user: user._id });
    return JSON.parse(JSON.stringify(mesocycles));
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
}

export async function activateMesocycle(meso: MesocycleType, clerkId: string) {
  try {
    await connectToDatabase();
    const user = await User.findOneAndUpdate({clerkId}, {$unset: {lastWorkout: 1}})
    await Mesocycle.updateMany({ isActive: true, user:user._id}, { isActive: false, $unset: { startDate: 1 } });
    await Mesocycle.findByIdAndUpdate(meso._id, { isActive: true, startDate: startOfDay(previousMonday(new Date()))});
    const newLog = {
      mesoTitle: meso.title,
      duration: meso.duration,
      mesoId: meso._id,
      user: user._id,
      weeks: Array.from({ length: meso.duration }, () => ({ workouts: [] }))
    }
    await Log.create(newLog)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
}

export async function deleteMesocycle(mesoId: string) {
  try {
    await connectToDatabase();
    await Mesocycle.findByIdAndDelete(mesoId);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
}

export async function getActiveMesocycle(clerkId: string){
    try{
        await connectToDatabase()
        const user: UserType | null = await User.findOne({clerkId})
        if(!user) throw new Error('User not found')
        const activeMeso: MesocycleType | null = await Mesocycle.findOne({user: user._id, isActive: true})
        const activeLog: LogType | null = await Log.findOne({mesoId: activeMeso?._id})
        return JSON.parse(JSON.stringify({meso: activeMeso, log: activeLog, lastWorkout: user.lastWorkout}))
    }catch(err: unknown){
        if(err instanceof Error){
            console.log(err.message)
        }
        throw err
    }
}

export async function createLog(log: LogType){
  try{
    await connectToDatabase()
    await Log.create(log)
    redirect('completed-mesocycles')
  }catch(err: unknown){
    if(err instanceof Error){
      console.log(err.message)
    }
    throw err
  }
}

export async function getLogs(clerkId: string){
  try{
    await connectToDatabase()
    const user = await User.findOne({clerkId})
    const logs = await Log.find({user: user._id})
    return JSON.parse(JSON.stringify(logs))
  }catch(err: unknown){
    if(err instanceof Error){
      console.log(err.message)
    }
  }
}

export async function addWorkoutToLog(logId: string, workout: WorkoutLog, weekIndex: number, workoutIndex: number, userId: string){
  
  try{
    await connectToDatabase();
    const updateQuery: any = {};
    updateQuery[`weeks.${weekIndex}.workouts`] = { $each: [workout], $position: workoutIndex };
    await Log.findByIdAndUpdate(logId, { $push: updateQuery });
    await User.findByIdAndUpdate(userId, {lastWorkout: new Date()})
  }catch(err: unknown){
    if(err instanceof Error){
      console.log(err.message)
    }
  }
}

export async function updateUserNutrition(clerkId: string, nutrition: Nutrition) {
  const date = startOfToday();
  try {
    await connectToDatabase();

    const userId = await getMongoIdFromClerkId(clerkId)

    const result = await NutritionModel.updateOne(
      { user: userId, date },
      {
        $inc: {
          'nutrition.protein': nutrition.protein,
          'nutrition.fat': nutrition.fat,
          'nutrition.carbs': nutrition.carbs,
          'nutrition.calories': nutrition.calories,
        },
      },
      { upsert: true } 
    );

  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log('ERROR: ', err.message);
    } else {
      console.log(err);
    }
  }
}

export async function getThisWeeksNutrition(clerkId: string){
  const weekStart = startOfWeek(new Date(), {weekStartsOn: 1})
  const weekEnd = endOfWeek(new Date(), {weekStartsOn: 1})

  try{
    const userId = await getMongoIdFromClerkId(clerkId)
    const thisWeeksNutrition = await NutritionModel.find({user: userId, date: {$gte: weekStart, $lte: weekEnd}}, 'date nutrition').sort({date: 1})
    console.log(thisWeeksNutrition)
    return thisWeeksNutrition
  }catch(err: unknown){
    if(err instanceof Error){
      console.log(err.message)
    }
    console.log(err)
  }
}

async function getMongoIdFromClerkId(clerkId: string): Promise<string>{
  let userId: string = ''
  try{
    const user = await User.findOne({ clerkId });
    if (!user) {
      throw new Error('User not found');
    }
    userId = user._id.toString();
  }catch(err: unknown){
    if(err instanceof Error){
      console.log(err.message)
    }
    console.log(err)
  }
  return userId
}