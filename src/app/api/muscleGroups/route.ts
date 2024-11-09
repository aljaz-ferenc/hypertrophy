import {connectToDatabase} from "@/database/mongoose";
import {NextResponse} from "next/server";
import MuscleGroup from "@/database/models/MuscleGroup";

export async function GET() {
    try {
        await connectToDatabase();
        const muscleGroups = await MuscleGroup.find()
        return NextResponse.json(muscleGroups);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log(err.message);
        }
    }
}