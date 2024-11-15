import { NextResponse} from 'next/server';
import {connectToDatabase} from "@/database/mongoose";
import Log from "@/database/models/Log";

export async function GET(request: Request, {params}: { params: { userId: string } }) {

    try {
        const userId = params.userId
        await connectToDatabase()
        const logs = await Log.find({user: userId})
        return NextResponse.json(logs);
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
                "Access-Control-Allow-Origin": "*", // or specify your domain
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        }
    );
}
