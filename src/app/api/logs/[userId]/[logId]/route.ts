import Log from "@/database/models/Log";
import { connectToDatabase } from "@/database/mongoose";
import User from "@/database/models/User";

export async function POST(
  request: Request,
  { params }: { params: { userId: string, logId: string } }
) {
  try {
    const { workout, weekIndex, workoutIndex } = await request.json();
    const userId = params.userId;
    const logId = params.logId
    await connectToDatabase();
    const updateQuery: any = {};
    updateQuery[`weeks.${weekIndex}.workouts`] = {
      $each: [workout],
      $position: workoutIndex,
    };
    console.log(updateQuery)
    // await Log.findByIdAndUpdate(logId, { $push: updateQuery });
    // await User.findByIdAndUpdate(userId, { lastWorkout: new Date() });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
}
