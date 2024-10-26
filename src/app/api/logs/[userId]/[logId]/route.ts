import Log from "@/database/models/Log";
import { connectToDatabase } from "@/database/mongoose";
import User from "@/database/models/User";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { userId: string; logId: string } }
) {
  try {
    const { workout, weekIndex, workoutIndex } = await request.json();
    const userId = params.userId;
    const logId = params.logId;
    await connectToDatabase();
    const updateQuery: any = {};
    updateQuery[`weeks.${weekIndex}.workouts`] = {
      $each: [workout],
      $position: workoutIndex,
    };
    const result = await Log.findOneAndUpdate({mesoId: logId}, { $push: updateQuery }, {new: true});
    console.log('RESULT: ', result)
    await User.findByIdAndUpdate(userId, { lastWorkout: new Date() });
    return NextResponse.json({ workout, weekIndex, workoutIndex });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
      return NextResponse.json({ message: err.message });
    }
    console.log(err);
    return NextResponse.json({ message: err });
  }
}

export async function OPTIONS() {
  return NextResponse.json(
    { message: "CORS preflight response" },
    {
      headers: {
        "Access-Control-Allow-Origin": "*", // or specify your domain
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}
