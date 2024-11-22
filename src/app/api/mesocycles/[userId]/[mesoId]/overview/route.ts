import {NextRequest, NextResponse} from "next/server";
import {connectToDatabase} from "@/database/mongoose";
import User from "@/database/models/User";
import Mesocycle from "@/database/models/Mesocycle";
import {addDays, endOfDay, getDay, getWeek, isAfter, isSameDay, startOfDay, subDays} from "date-fns";
import Log from "@/database/models/Log";
import Nutrition from "@/database/models/Nutrition";
import FoodItem from "@/database/models/FoodItem";
FoodItem;
const getSingleNutritionCalories = (nutrition: any) => {
    return nutrition.amount * nutrition.item.calories / 100
}

export async function GET(req: NextRequest, {params}: { params: { userId: string, mesoId: string } }) {
    await connectToDatabase();
    const meso = await Mesocycle.findById(params.mesoId);
    const log = await Log.findOne({mesoId: meso._id});
    const mesoLengthInDays = meso.duration * 7;
    const startDate = startOfDay(subDays(new Date(meso.startDate), 1));
    const endDate = startOfDay(addDays(startDate, mesoLengthInDays))
    const yesterday = startOfDay(subDays(new Date(), 1));
    const user = await User.findById(params.userId).select('stats.weight').where('stats.weight.date').lean()

    if(!user){
        return NextResponse.json({error: 'user does not exist'});
    }

    const weight = (user as any).stats.weight.filter((w: any) => w.date > startOfDay(startDate) && w.date < endOfDay(endDate))

    // @ts-ignore
    const weightByWeeks = Object.groupBy(weight, (w) => getWeek(w.date))
    const averageWeightByWeeks = Object.keys(weightByWeeks).map((weekNumber) => {
        const weightsForWeek = weightByWeeks[+weekNumber];

        // @ts-ignore
        const averageWeight = weightsForWeek.reduce((sum, weightObj) => sum + weightObj.value, 0) / weightsForWeek.length;

        return {
            week: +weekNumber,
            averageWeight: +averageWeight.toFixed(1),
        };
    });

    const getWeeksWithDays = async (params: { userId: string; startDate: Date; endDate: Date }) => {
        // Fetch nutrition data
        const mesoNutrition = await Nutrition.find({
            user: params.userId,
            date: {
                $gte: params.startDate,
                $lte: params.endDate,
            },
        }).populate('item');

        // Exclude today's entries
        const filteredNutrition = mesoNutrition.filter((n) => {
            const entryDate = startOfDay(n.date)
            return entryDate !== startOfDay(new Date());
        });

        // Group by weeks, then by days
        const weeks = Object.groupBy(filteredNutrition, (n) => getWeek(new Date(n.date)));

        return Object.entries(weeks).map(([week, weekEntries]) => {
            // Group by day within each week
            // @ts-ignore
            const days = Object.groupBy((weekEntries as any), (entry) => entry.date.toISOString().split('T')[0]);

            // Filter out empty days
            const filteredDays = Object.values(days).filter((dayEntries: any) => dayEntries.length > 0);

            // Calculate total calories for each day
            const dailyCalories = filteredDays.map((dayEntries) => {
                // @ts-ignore
                return dayEntries.reduce((sum, entry) => {
                    // @ts-ignore
                    return sum + getSingleNutritionCalories(entry);
                }, 0);
            });

            // Calculate weekly total and average
            // @ts-ignore
            const totalCalories = Math.round(dailyCalories.reduce((sum, cals) => sum + cals, 0));
            const averageCalories = filteredDays.length > 0 ? totalCalories / filteredDays.length : 0;

            return {
                week: +week,
                days: filteredDays,
                totalCalories,
                averageCalories,
                numberOfDays: filteredDays.length,
            };
        });
    };


// Example usage
    const weeksWithDays = await getWeeksWithDays({
        userId: params.userId,
        startDate: startDate,
        endDate: endDate,
    });

    const {totalCalories, totalDays} = weeksWithDays.reduce(
        (acc, week) => {
            acc.totalCalories += week.totalCalories;
            acc.totalDays += week.numberOfDays;
            return acc;
        },
        {totalCalories: 0, totalDays: 0}
    );

    const averageDailyCalories = Math.round(totalDays > 0 ? totalCalories / totalDays : 0);
    const mesoDates = [];
    const workouts = log.weeks.flatMap((w: any) => w.workouts).flat();
    const nonRestDays = meso.workouts.flatMap((w: any) => w.weekDay)
    const allDays = [1, 2, 3, 4, 5, 6, 7]
    const restDays = allDays.filter(day => !nonRestDays.includes(day));

    for (let i = 1; i <= mesoLengthInDays; i++) {
        const date = addDays(startDate, i);

        const workout = workouts.find((w: any) => {
            return isSameDay(
                startOfDay(addDays(new Date(w.completedAt), 1)),
                startOfDay(date)
            );
        });

        const workoutStatus = (workout: any, date: Date) => {
            const dayOfWeek = (getDay(date) + 5) % 7 + 1;
            if (isAfter(date, addDays(yesterday, 1))) {
                return 'upcoming';
            }
            if (workout) {
                return 'completed';
            }
            return restDays.includes(dayOfWeek) ? 'rest' : 'missed';
        };
        mesoDates.push({date, workoutCompleted: workoutStatus(workout, date)});
    }
    return NextResponse.json({mesoDates, mesocycle: meso.title, averageDailyCalories, nutritionByWeeks: weeksWithDays, weightByWeeks: averageWeightByWeeks});
}

export async function OPTIONS() {
    return NextResponse.json(
        {message: "CORS preflight response"},
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        }
    );
}
