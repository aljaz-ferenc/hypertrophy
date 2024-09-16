"use server";

import { Document, ObjectId } from "mongoose";
import User from "./database/models/User";
import NutritionModel from './database/models/Nutrition'
import { connectToDatabase } from "./database/mongoose";
import { Days, Log as LogType, Mesocycle as MesocycleType, Set, Workout, WorkoutLog, User as UserType, Nutrition, Stats, Measurement, WeightUnits, BodyPart } from "./types";
import Mesocycle from "./database/models/Mesocycle";
import {differenceInWeeks, endOfWeek, previousMonday, startOfDay, startOfToday, startOfTomorrow, startOfYesterday, startOfWeek} from 'date-fns'
import Log from "./database/models/Log";
import { redirect } from "next/navigation";
import { BRMData, calculateBMR } from "./lib/utils";

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

// export async function updateUserNutrition(clerkId: string, nutrition: {id: string, amount: number, date: Date}[]) {
//   const date = startOfToday();
//   try {
//     await connectToDatabase();

//     const userId = await getMongoIdFromClerkId(clerkId)

//     const result = await NutritionModel.(
//       { user: userId },
//       {nutrition},
//       { upsert: true } 
//     );

//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       console.log('ERROR: ', err.message);
//     } else {
//       console.log(err);
//     }
//   }
// }

export async function addNutrition(clerkId: string, nutrition: Nutrition[]){
  console.log('NUTRITION: ', nutrition)
  try{
    await connectToDatabase()
    const userId = await getMongoIdFromClerkId(clerkId)
    const nutritionArr = nutrition.map(n => {
      return {...n, user: userId}
    })
    const result = await NutritionModel.insertMany(nutritionArr)
  }catch(err: any){
    console.log(err)
  }
}

export async function getThisWeeksNutrition(clerkId: string){
  const weekStart = startOfWeek(new Date(), {weekStartsOn: 1})
  const weekEnd = endOfWeek(new Date(), {weekStartsOn: 1})
  console.log('haha')

  try{
    const userId = await getMongoIdFromClerkId(clerkId)
    const thisWeeksNutrition = await NutritionModel.find({user: userId, date: {$gte: weekStart, $lte: weekEnd}}, 'itemId amount date item _id').sort({date: 1})
    console.log(thisWeeksNutrition)
    return JSON.parse(JSON.stringify(thisWeeksNutrition));
  }catch(err: unknown){
    if(err instanceof Error){
      console.log(err.message)
    }
    console.log(err)
  }
}

async function getMongoIdFromClerkId(clerkId: string): Promise<string | undefined>{
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
      return undefined
    }else{
      console.log(err)
    }
  }
  return userId
}

export async function getStats(clerkId: string):Promise<Stats | undefined> {
  try{
    await connectToDatabase()
    const userId = await getMongoIdFromClerkId(clerkId)
    const stats = await User.findById(userId).select('stats')
    return JSON.parse(JSON.stringify(stats.stats));
  }catch(err: unknown){
    if(err instanceof Error){
      console.log(err.message)
    }else{
      console.log(err)
    }
  }
}

export async function updateStats(clerkId: string, stats: Partial<Stats>) {
  try {
    await connectToDatabase();
    const userId = await getMongoIdFromClerkId(clerkId);

    // Create an update object with dot notation for the fields you want to update.
    const updateObject = Object.entries(stats).reduce((acc, [key, value]) => {
      acc[`stats.${key}`] = value;
      return acc;
    }, {} as Record<string, unknown>);

    // Update only the specified fields.
    const result = await User.findByIdAndUpdate(
      userId,
      { $set: updateObject },
      { new: true, upsert: true }
    );

    return JSON.parse(JSON.stringify(result)); // If you want to return the updated document.
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log(err);
    }
  }
}

export async function addWeight(clerkId: string, weight: Measurement<WeightUnits>){
  console.log("ADD WEIGHT DATA: ", weight)
  try{
    await connectToDatabase()
    const userId = await getMongoIdFromClerkId(clerkId)
    const result = await User.findByIdAndUpdate(userId, {$push: {'stats.weight': weight}})
    console.log(result)
  }catch(err: unknown){
    if(err instanceof Error){
      console.log(err.message)
    }else{
      console.log(err)
    }
  }
}

export async function updateBMR(clerkId: string, data: BRMData){
  if(!data.age || !data.gender || !data.weight || !data.height) return

  try{
    await connectToDatabase()
    const userId = await getMongoIdFromClerkId(clerkId)
    const result = await User.findByIdAndUpdate(userId, {$set: {'stats.bmr': calculateBMR(data)}})
  }catch(err: unknown){
    if(err instanceof Error){
      console.log(err.message)
    }else{
      console.log(err)
    }
  }
}

export async function updateBodyPart(clerkId: string, bodyPart: BodyPart, value: number) {
  if (!clerkId || !bodyPart || !value) return

  try {
    await connectToDatabase()
    const userId = await getMongoIdFromClerkId(clerkId)

    const update = { [`stats.bodyParts.${bodyPart}`]: { date: new Date(), value } }

    const result = await User.findByIdAndUpdate(userId, { $push: update }, { new: true, upsert: true })
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message)
    } else {
      console.log(err)
    }
  }
}


export async function getBodyParts(clerkId: string){
  try{
    await connectToDatabase()
    const userId = await getMongoIdFromClerkId(clerkId)
    const bodyParts = await User.findById(userId, 'stats.bodyParts')
    console.log(JSON.parse(JSON.stringify(bodyParts)))
    return JSON.parse(JSON.stringify(bodyParts))
  }catch(err: unknown){
    if (err instanceof Error) {
      console.log(err.message)
    } else {
      console.log(err)
    }
  }
}