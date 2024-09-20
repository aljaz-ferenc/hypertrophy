import {NextRequest, NextResponse} from 'next/server';
import {connectToDatabase} from "@/database/mongoose";
import {Document} from "mongoose";
import User from "@/database/models/User";

export async function POST(req: NextRequest, res: NextResponse) {
    const body = await req.json()
    console.log(body)
    return NextResponse.json({ name: 'test' });
}