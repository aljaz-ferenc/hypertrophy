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
} from "date-fns";
import nutrition from "@/database/models/Nutrition";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    console.log("USER_ID: ", userId);
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
    });

    // Query for today
    FoodItem;
    const today = await Nutrition.find({
      user: userId,
      date: {
        $gte: startOfTodayDate,
        $lte: endOfTodayDate,
      },
    }).populate("item");

    // console.log('BBBBBBBBBBBBBBBBBBB: ',today);

    const totalToday = today.reduce(
      (acc, n) => {

        return {
          calories: acc.calories + n.item.calories,
          protein: acc.protein + n.item.protein,
          fat: acc.fat + n.item.fat,
          carbs: acc.carbs + n.item.carbs,
        };
      },
      { calories: 0, protein: 0, fat: 0, carbs: 0 }
    );

    console.log("TOTAL_TODAY: ", totalToday);

    // Return both results
    return NextResponse.json({ nutrition: today, totalToday });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    }
    return NextResponse.json({ error: err });
  }
}
