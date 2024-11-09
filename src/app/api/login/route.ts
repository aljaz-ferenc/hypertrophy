import User from "@/database/models/User";
import { connectToDatabase } from "@/database/mongoose";
import {NextResponse} from "next/server";
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
    try {
        const {username, password} = await request.json()

        await connectToDatabase()
        const user = await User.findOne({username})

        if(!user){
            return NextResponse.json({error: "User with this username doesn't exist"})
        }

        const passwordCorrect = await bcrypt.compare(password, user.password)

        if(!passwordCorrect){
            return NextResponse.json({error: "Password incorrect"})
        }

        return NextResponse.json({user});
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log(err.message)
        }
    }
}

export async function OPTIONS() {
    return NextResponse.json(
        { message: "CORS preflight response" },
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        }
    );
}