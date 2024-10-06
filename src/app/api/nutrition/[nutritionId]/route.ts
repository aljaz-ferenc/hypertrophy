import { NextResponse } from "next/server";
import { connectToDatabase } from "@/database/mongoose";
import Nutrition from "@/database/models/Nutrition";
import {
  endOfWeek,
  startOfWeek,
  startOfToday,
  endOfToday,
  subDays,
} from "date-fns";
import nutrition from "@/database/models/Nutrition";

export async function DELETE(
  request: Request,
  { params }: { params: { nutritionId: string } }
) {
  try {
    const result = await Nutrition.findByIdAndDelete(params.nutritionId)
    return NextResponse.json({ nutrition: result });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
}

export async function OPTIONS() {
  return NextResponse.json(
    { message: "CORS preflight response" },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, DELETE",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}