import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Event from "@/database/event.model"
import { promises } from "dns";
import {v2 as cloudinary} from 'cloudinary'
import { error } from "console";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const fordata = await req.json();

        let event;
        try {
            
            // fordata is already a plain object, no need to convert
            event = fordata;
            
        } catch (e) {
            return NextResponse.json({message: "Invalid JSON format"}, {status: 400})
        }

        const createEvents = await Event.create(event);
        
        return NextResponse.json({message: "Events created successfully", event: createEvents}, {status: 201})

    } catch (e) {
        console.error(e);
        return NextResponse.json({message: "Event creation failed", error: e instanceof Error ? e.message : "Unknown"}, {status: 500})
        
    }
}