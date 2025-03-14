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
import {getAverageNutrition, getTodaysDay} from "@/lib/utils";

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
    const startOfTodayDate = startOfToday(); 
    const endOfTodayDate = endOfToday(); 

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

    const thisDay = getTodaysDay()

    const totalWeek = getAverageNutrition(thisWeek)
    const totalToday = getAverageNutrition(today)

    const totalWeekAverage = {
      calories: Math.round(totalWeek.calories / thisDay),
      protein: Math.round(totalWeek.protein / thisDay),
      fat: Math.round(totalWeek.fat / thisDay),
      carbs: Math.round(totalWeek.carbs / thisDay)
    }
    
    const data: {date: Date, calories: number, amount: number}[] = []

    thisWeek.forEach(n => data.push({calories: n.item.calories, date: startOfDay(n.date), amount: n.amount}))

    const grouped = data.reduce((acc, n) => {
      const dateKey = n.date.toDateString()

      if(!acc[dateKey]){
        acc[dateKey] = {date: n.date, caloriesTotal: (n.calories * n.amount) / 100}
      }else{
        acc[dateKey].caloriesTotal += (n.calories * n.amount) / 100
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
    return NextResponse.json({ nutrition: today, totalToday, totalWeek: totalWeekAverage, weightData });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    }
    return NextResponse.json({ error: err });
  }
}
