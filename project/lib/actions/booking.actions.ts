'use server';

import connectDB from "@/lib/mongodb";
import Booking from "@/database/booking.model";
import mongoose from "mongoose";

export const createBooking = async ({eventId, email}: {eventId: string; email: string}) => {
    try {
        await connectDB();
        
        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return { 
                success: false, 
                error: "Invalid event ID format" 
            };
        }
        
        // Convert string to ObjectId
        const objectId = new mongoose.Types.ObjectId(eventId);
        
        await Booking.create({ eventId: objectId, email });
        
        return { success: true };
    } catch (e) {
        console.error("Create booking failed:", e);
        
        // Better error handling
        let errorMessage = "Unknown error";
        if (e instanceof Error) {
            errorMessage = e.message;
        }
        
        return { 
            success: false, 
            error: errorMessage 
        };
    }
}