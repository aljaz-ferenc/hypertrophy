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
