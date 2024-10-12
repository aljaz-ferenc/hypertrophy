import Nutrition from "@/database/models/Nutrition";
import { connectToDatabase } from "@/database/mongoose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const nutrition = await request.json();

  try {
    await connectToDatabase();
    const newNutrition = await Nutrition.create(nutrition);
    return NextResponse.json(newNutrition);
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
