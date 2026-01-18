import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    try {
        await connectDB();

        const forData = await req.formData()

        let events;

        try {
           events: Object.fromEntries(forData.entries())
        } catch (e) {
            return NextResponse.json({message: "Invalid JSON data"},{status: 400})
        }
    } catch (e) {
        console.error(e);
        return NextResponse.json({message: "Event creation falied", error: e instanceof Error ? e.message : "Unknown"}, {status: 500})
        
    }
}