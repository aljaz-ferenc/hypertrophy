import { NextResponse } from "next/server";
import { connectToDatabase } from "@/database/mongoose";
import Nutrition from "@/database/models/Nutrition";
import FoodItem from "@/database/models/FoodItem";
import {
  endOfWeek,
  startOfWeek,
  startOfToday,
  endOfToday,
  subDays,
  startOfDay,
} from "date-fns";
import nutrition from "@/database/models/Nutrition";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    await connectToDatabase();

    // Get start and end of the current week
    const startOfThisWeek = startOfWeek(new Date(), { weekStartsOn: 1 }); // Monday as the start of the week
    const endOfThisWeek = endOfWeek(new Date(), { weekStartsOn: 1 }); // Sunday as the end of the week

    // Get start and end of today
    const startOfTodayDate = startOfToday(); // Start of today
    const endOfTodayDate = endOfToday(); // End of today

    // Query for the current week
    const thisWeek = await Nutrition.find({
      user: userId,
      date: {
        $gte: startOfThisWeek,
        $lte: endOfThisWeek,
      },
    }).populate('item');

    // Query for today
    FoodItem;
    const today = await Nutrition.find({
      user: userId,
      date: {
        $gte: startOfTodayDate,
        $lte: endOfTodayDate,
      },
    }).populate("item");

    const totalToday = today.reduce(
      (acc, n) => {

        return {
          calories: Math.round(acc.calories + n.item.calories * n.amount / 100),
          protein: Math.round(acc.protein + n.item.protein * n.amount / 100),
          fat: Math.round(acc.fat + n.item.fat * n.amount / 100),
          carbs: Math.round(acc.carbs + n.item.carbs * n.amount / 100),
        };
      },
      { calories: 0, protein: 0, fat: 0, carbs: 0 }
    );

    const totalWeek = thisWeek.reduce(
      (acc, n) => {

        return {
          calories: Math.round(acc.calories + n.item.calories* n.amount / 100),
          protein: Math.round(acc.protein + n.item.protein* n.amount / 100),
          fat: Math.round(acc.fat + n.item.fat* n.amount / 100),
          carbs: Math.round(acc.carbs + n.item.carbs* n.amount / 100),
        };
      },
      { calories: 0, protein: 0, fat: 0, carbs: 0 }
    );
    
    const data: {date: Date, calories: number}[] = []

    thisWeek.forEach(n => data.push({calories: n.item.calories, date: startOfDay(n.date)}))

    const grouped = data.reduce((acc, n) => {
      const dateKey = n.date.toDateString()

      if(!acc[dateKey]){
        acc[dateKey] = {date: n.date, caloriesTotal: n.calories}
      }else{
        acc[dateKey].caloriesTotal += n.calories
      }
      return acc
    }, {} as {[key: string]: {date: Date, caloriesTotal: number}})

    const weightData = Object.values(grouped)

    // thisWeek.forEach(n => {
    //   const date = startOfDay(n.date)

    //   if(weightData.some((d, i) => d.date === date)){
    //     weightData = weightData.map(da => {
    //       if(da.date === date){
    //         return {...da, calories: da.calories + n.calories}
    //       }
    //       return da
    //     })
    //   }
    // })

    // Return both results
    return NextResponse.json({ nutrition: today, totalToday, totalWeek, weightData });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    }
    return NextResponse.json({ error: err });
  }
}
