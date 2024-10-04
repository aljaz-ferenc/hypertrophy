import { NextResponse} from 'next/server';
import {connectToDatabase} from "@/database/mongoose";
import User from "@/database/models/User";

export async function GET(request: Request, {params}: { params: { userId: string } }) {

    try {
        const userId = params.userId
        await connectToDatabase()
        const user = await User.findById(userId)
        return NextResponse.json(user);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log(err.message)
        }
    }
}

export async function PATCH(request: Request, {params}: {params:{userId: string}}){
    let updateQuery

    try{
        const userId = params.userId
        const update = await request.json()
        if(update.action === 'update-weight'){
            updateQuery = { $push: { 'stats.weight': {value: update.weight, date: new Date(), units: 'kg'}} }
        }
        console.log(updateQuery)
        await connectToDatabase()
        const user = await User.findByIdAndUpdate(userId, updateQuery)
        return NextResponse.json({message: 'hello'});
    }catch (err: unknown) {
        if (err instanceof Error) {
            console.log(err.message)
        }
        return NextResponse.json({message:'error'})
    }
}