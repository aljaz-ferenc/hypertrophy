import {NextResponse} from "next/server";
import {hashPassword} from "@/lib/utils";
import {connectToDatabase} from "@/database/mongoose";
import User from "@/database/models/User";

type RequestBody = {
    username: string,
    password: string,
    passwordConfirm: string
}

export async function POST(request: Request) {
    try {
        const {username, password, passwordConfirm}: RequestBody = await request.json()

        const passwordsMatch = password === passwordConfirm
        if (!passwordsMatch) {
            return NextResponse.json({message: 'Passwords do not match', status: 400},)
        }

        const isPasswordLongEnough = password.length > 5
        if (!isPasswordLongEnough) {
            return NextResponse.json({message: 'Passwords must be at least 6 characters long', status: 400},)
        }

        const hashedPass = await hashPassword(password)

        await connectToDatabase()
        const newUser = await User.create({username, password: hashedPass})

        return NextResponse.json(newUser);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log(err.message)
            return NextResponse.json('error');
        }
    }
}

export async function OPTIONS() {
    return NextResponse.json(
        {message: "CORS preflight response"},
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        }
    );
}