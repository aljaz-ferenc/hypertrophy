import { NextResponse } from "next/server";
import { connectToDatabase } from "@/database/mongoose";
import User from "@/database/models/User";
import Mesocycle from "@/database/models/Mesocycle";
import Log from "@/database/models/Log";

export async function GET(request: Request, { params }: { params: { logId: string } }) {
    const {userId, mesoId, weekIndex, workout, workoutIndex} = await request.json()
    console.log({userId, mesoId, weekIndex, workout, workoutIndex})
//   try {
//     const logId = params.logId;
//     if (!logId) throw new Error("userId not found");

//     await connectToDatabase();
//     const updateQuery: any = {};
//     updateQuery[`weeks.${weekIndex}.workouts`] = {
//       $each: [workout],
//       $position: workoutIndex,
//     };
//     const log = await Log.findOneAndUpdate({mesoId}, { $push: updateQuery });
//     await User.findByIdAndUpdate(userId, { lastWorkout: new Date() });
    return NextResponse.json({message:'hi'});
//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       console.log(err.message);
//     }
//   }
}
