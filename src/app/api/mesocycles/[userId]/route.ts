import { NextResponse } from "next/server";
import { connectToDatabase } from "@/database/mongoose";
import Mesocycle from "@/database/models/Mesocycle";
import { Mesocycle as MesocycleType } from "@/types";
import User from "@/database/models/User";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    if (!userId) throw new Error("userId not found");
    await connectToDatabase();
    const mesocycle = await Mesocycle.find({ user: userId });
    return NextResponse.json(mesocycle);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
}

export async function POST(
  request: Request,
  { params }: { params: {  userId: string } }
) {
    const body = await request.json()

  try {
    await connectToDatabase();
    const user = await User.findById(params.userId);
    const newMesocycle = { ...body, user: user._id };
    const meso = await Mesocycle.create(newMesocycle);
    return NextResponse.json(meso);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
    return NextResponse.json({error: err});
  }
}
