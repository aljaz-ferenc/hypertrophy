import {connectToDatabase} from "@/database/mongoose";
import {NextResponse} from "next/server";
import MuscleGroup from "@/database/models/MuscleGroup";
import ExerciseModel from "@/database/models/Exercise";

export async function GET() {
    try {
        await connectToDatabase();
        const exercises = await ExerciseModel.find().populate('muscleGroup')
        return NextResponse.json(exercises);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log(err.message);
        }
    }
}