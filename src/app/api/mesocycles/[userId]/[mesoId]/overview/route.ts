import {NextRequest, NextResponse} from "next/server";
import {connectToDatabase} from "@/database/mongoose";
import User from "@/database/models/User";
import Mesocycle from "@/database/models/Mesocycle";
import {addDays, getDay, isAfter, isSameDay, startOfDay, subDays} from "date-fns";
import Log from "@/database/models/Log";

export async function GET(req: NextRequest, {params}: { params: { userId: string, mesoId: string } }) {
    await connectToDatabase();
    const meso = await Mesocycle.findById(params.mesoId);
    const log = await Log.findOne({mesoId: meso._id});
    const mesoLengthInDays = meso.duration * 7;
    const startDate = startOfDay(new Date(meso.startDate));
    const yesterday = startOfDay(subDays(new Date(), 1));

    const mesoDates = [];
    const workouts = log.weeks.flatMap(w => w.workouts).flat();
    const nonRestDays = meso.workouts.flatMap(w => w.weekDay)
    const allDays = [1, 2, 3, 4, 5, 6, 7]
    const restDays = allDays.filter(day => !nonRestDays.includes(day));

    for (let i = 0; i <= mesoLengthInDays - 1; i++) {
        const date = addDays(startDate, i);

        const workout = workouts.find((w) => {
            return isSameDay(
                startOfDay(addDays(new Date(w.completedAt), 1)),
                startOfDay(date)
            );
        });

        const workoutStatus = (workout: any, date: Date) => {
            const dayOfWeek = (getDay(date) + 5) % 7 + 1;
            console.log(dayOfWeek)
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
    return NextResponse.json({mesoDates, mesocycle: meso.title});
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
