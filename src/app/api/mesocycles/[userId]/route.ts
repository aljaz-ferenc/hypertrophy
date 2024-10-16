import { NextResponse} from 'next/server';
import {connectToDatabase} from "@/database/mongoose";
import Mesocycle from "@/database/models/Mesocycle";

export async function GET(request: Request, {params}: { params: { userId: string } }) {
    try {
        const userId = params.userId
        if(!userId) throw new Error('userId not found')
        await connectToDatabase()
        const mesocycle = await Mesocycle.find({user: userId})
        return NextResponse.json(mesocycle);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log(err.message)
        }
    }
}