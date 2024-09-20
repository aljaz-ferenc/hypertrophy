import { NextResponse} from 'next/server';
import {connectToDatabase} from "@/database/mongoose";
import User from "@/database/models/User";
import Mesocycle from "@/database/models/Mesocycle";

export async function GET(request: Request, {params}: { params: { userId: string } }) {
    try {
        const userId = params.userId
        if(!userId) throw new Error('userId not found')
        await connectToDatabase()
        const meso = await Mesocycle.find({user: userId})
        return NextResponse.json(meso);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log(err.message)
        }
    }
}