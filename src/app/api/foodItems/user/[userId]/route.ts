import FoodItem from "@/database/models/FoodItem"
import { connectToDatabase } from "@/database/mongoose"
import { NextResponse } from "next/server"

export async function GET(request: Request, {params}: { params: { userId: string } }){
    try{
        const userId = params.userId
        await connectToDatabase()
        const items = await FoodItem.find({user: userId})
        console.log(items)
       return NextResponse.json(items)
    }catch(err: unknown){
        if(err instanceof Error){
            return console.log(err.message)
        }
        console.log(err)
    }
}