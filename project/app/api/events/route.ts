import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Event from "@/database/event.model"
import {v2 as cloudinary} from 'cloudinary'

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const formData = await req.formData();

        // Extract the file first
        const file = formData.get('image') as File;

        if (!file) {
            return NextResponse.json({message: "Image is required"}, {status: 400})
        }

        // Convert FormData to a plain object (excluding the file)
        const eventData: { [key: string]: string | string[] } = {};
        
        formData.forEach((value, key) => {
            if (key !== 'image') {
                // Map 'organize' to 'organizer' for the database
                const dbKey = key === 'organize' ? 'organizer' : key;
                
                // Handle arrays (like tags)
                if (key === 'tags') {
                    try {
                        eventData[dbKey] = JSON.parse(value as string);
                    } catch {
                        eventData[dbKey] = value as string;
                    }
                } else {
                    eventData[dbKey] = value as string;
                }
            }
        });

        // Upload image to Cloudinary
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadedFile = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {resource_type: 'image', folder: 'DevEvent'}, 
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            ).end(buffer);
        });

        // Add the uploaded image URL to event data
        eventData.image = (uploadedFile as {secure_url: string}).secure_url;

        // Create the event in the database
        const createdEvent = await Event.create(eventData);
        
        return NextResponse.json({
            message: "Event created successfully", 
            event: createdEvent
        }, {status: 201});

    } catch (e) {
        console.error(e);
        return NextResponse.json({
            message: "Event creation failed", 
            error: e instanceof Error ? e.message : "Unknown"
        }, {status: 500});
    }
}