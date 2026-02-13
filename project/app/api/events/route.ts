import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Event from "@/database/event.model"
import { v2 as cloudinary } from 'cloudinary'

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const formData = await req.formData();
        // Extract the file first
        const file = formData.get('image') as File;

        if (!file) {
            return NextResponse.json({ message: "Image is required" }, { status: 400 })
        }

        // Convert FormData to a plain object
        const eventData: { [key: string]: string | string[] } = {};

        formData.forEach((value, key) => {
            // Skip the image file itself
            if (key === 'image') return;

            if (key === 'tags' || key === 'agenda') {
                const rawValue = value as string;

                try {
                    const parsed = JSON.parse(rawValue);

                    // If valid JSON array
                    if (Array.isArray(parsed) && parsed.length > 0) {
                        eventData[key] = parsed;
                    } else {
                        throw new Error("Empty array");
                    }

                } catch {
                    // Fallback: split by comma (for multipart form safety)
                    const splitValues = rawValue
                        .split(',')
                        .map(item => item.trim())
                        .filter(item => item.length > 0);

                    eventData[key] = splitValues;
                }
            } else {
                // Add all other fields and clean them
                let cleanValue = (value as string).trim();
                // Remove trailing periods, commas, quotes, and other punctuation
                cleanValue = cleanValue.replace(/[.,;'"]+$/g, '');
                eventData[key] = cleanValue;
            }
        });

        // Upload image to Cloudinary
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadedFile = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { resource_type: 'image', folder: 'DevEvent' },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            ).end(buffer);
        });

        // Add the uploaded image URL to event data
        eventData.image = (uploadedFile as { secure_url: string }).secure_url;

        // Create the event in the database
        const createdEvent = await Event.create(eventData);

        return NextResponse.json({
            message: "Event created successfully",
            event: createdEvent
        }, { status: 201 });

    } catch (e) {
        console.error("Full error:", e);
        return NextResponse.json({
            message: "Event creation failed",
            error: e instanceof Error ? e.message : "Unknown"
        }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const events = await Event.find().sort({ createdAt: -1 })

        return NextResponse.json({ message: "Events fetched Successfully", events }, { status: 200 })

    } catch (e) {
        return NextResponse.json({ message: "Events fetching failed", error: e }, { status: 500 })
    }
}