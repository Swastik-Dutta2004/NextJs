import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Event from "@/database/event.model"

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const fordata = await req.formData();

        let event;
        try {
            event = Object.fromEntries(fordata.entries())
        } catch (e) {
            return NextResponse.json({message: "Invaild JSON format"}, {status: 400})
        }

        const createEvents = await Event.create(event);
        
        return NextResponse.json({message: "Events create successfully", event: createEvents}, {status: 201})

    } catch (e) {
        console.error(e);
        return NextResponse.json({message: "Event creation falied", error: e instanceof Error ? e.message : "Unknown"}, {status: 500})
        
    }
}