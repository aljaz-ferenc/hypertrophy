import { NextResponse} from 'next/server';
import {connectToDatabase} from "@/database/mongoose";
import Mesocycle from "@/database/models/Mesocycle";
import FoodItem from "@/database/models/FoodItem";

export async function POST(request: Request) {
    try {
        const foodItem = await request.json()
        await connectToDatabase()
        const item = await FoodItem.create(foodItem)
        console.log(item)
        return NextResponse.json(item);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log(err.message)
        }
    }
}

export async function OPTIONS(request: Request){
    return NextResponse.json({hi: 'hi'})
}