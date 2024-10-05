import { NextResponse } from 'next/server';
import { connectToDatabase } from "@/database/mongoose";
import Nutrition from "@/database/models/Nutrition";
import { endOfWeek, startOfWeek, startOfToday, endOfToday } from "date-fns";
import nutrition from "@/database/models/Nutrition";

export async function GET(request: Request, { params }: { params: { userId: string } }) {
    try {
        const userId = params.userId;
        await connectToDatabase();

        // Get start and end of the current week
        const startOfThisWeek = startOfWeek(new Date(), { weekStartsOn: 1 }); // Monday as the start of the week
        const endOfThisWeek = endOfWeek(new Date(), { weekStartsOn: 1 });     // Sunday as the end of the week

        // Get start and end of today
        const startOfTodayDate = startOfToday(); // Start of today
        const endOfTodayDate = endOfToday();     // End of today

        // Query for the current week
        const thisWeek = await Nutrition.find({
            user: userId,
            date: {
                $gte: startOfThisWeek,
                $lte: endOfThisWeek
            }
        });

        // Query for today
        // const today = await Nutrition.find({
        //     user: userId,
        //     date: {
        //         $gte: startOfTodayDate,
        //         $lte: endOfTodayDate
        //     }
        // });

        // Return both results
        return NextResponse.json({nutrition: thisWeek});
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log(err.message);
        }
    }
}
