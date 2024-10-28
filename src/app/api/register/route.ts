import {NextResponse} from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json()
        return NextResponse.json(body);
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