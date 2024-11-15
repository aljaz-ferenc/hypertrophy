import {NextRequest, NextResponse} from "next/server";
import {connectToDatabase} from "@/database/mongoose";
import User from "@/database/models/User";
import Mesocycle from "@/database/models/Mesocycle";
import {nextMonday, startOfDay} from "date-fns";
import Log from "@/database/models/Log";

export async function POST(req: NextRequest, { params }: { params: { userId: string, mesoId: string } }) {
    const meso = await req.json()
    await connectToDatabase();
    const user = await User.findByIdAndUpdate(params.userId, {$unset: {lastWorkout: 1}})
    await Mesocycle.updateMany({ isActive: true, user:user._id}, { isActive: false, $unset: { startDate: 1 } });
    await Mesocycle.findByIdAndUpdate(params.mesoId, { isActive: true, startDate: startOfDay(nextMonday(new Date()))});

    const newLog = {
        mesoTitle: meso.title,
        duration: meso.duration,
        mesoId: meso._id,
        user: user._id,
        weeks: Array.from({ length: meso.duration }, () => ({ workouts: [] }))
    }
    await Log.create(newLog)
    return NextResponse.json({ userId: params.userId, mesoId: params.mesoId });
}

export async function OPTIONS() {
    return NextResponse.json(
        { message: "CORS preflight response" },
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        }
    );
}
