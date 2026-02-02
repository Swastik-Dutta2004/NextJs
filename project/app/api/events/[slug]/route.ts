import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Event, { IEvent } from "@/database/event.model";
import mongoose from "mongoose";

/**
 * GET /api/events/[slug]
 * 
 * Fetches a single event by its unique slug identifier.
 * 
 * @param request - Next.js request object
 * @param params - Route parameters containing the slug
 * @returns JSON response with event data or error message
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
): Promise<NextResponse> {
  try {
    // Establish database connection
    await connectDB();

    // Extract and validate slug parameter
    const { slug } = params;

    // Validate slug is provided
    if (!slug) {
      return NextResponse.json(
        { 
          message: "Slug parameter is required",
          error: "MISSING_SLUG" 
        },
        { status: 400 }
      );
    }

    // Validate slug format (alphanumeric, hyphens, and underscores only)
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/i;
    if (!slugRegex.test(slug.trim())) {
      return NextResponse.json(
        { 
          message: "Invalid slug format. Slug must contain only alphanumeric characters and hyphens",
          error: "INVALID_SLUG_FORMAT" 
        },
        { status: 400 }
      );
    }

    // Query event by slug
    const event: IEvent | null = await Event.findOne({ 
      slug: slug.trim().toLowerCase() 
    }).lean<IEvent>();

    // Handle event not found
    if (!event) {
      return NextResponse.json(
        { 
          message: `Event with slug "${slug}" not found`,
          error: "EVENT_NOT_FOUND" 
        },
        { status: 404 }
      );
    }

    // Return successful response with event data
    return NextResponse.json(
      { 
        message: "Event fetched successfully",
        event 
      },
      { status: 200 }
    );

  } catch (error) {
    // Log error for debugging (server-side only)
    console.error("Error fetching event by slug:", error);

    // Handle Mongoose-specific errors
    if (error instanceof mongoose.Error.CastError) {
      return NextResponse.json(
        { 
          message: "Invalid data format in query",
          error: "CAST_ERROR" 
        },
        { status: 400 }
      );
    }

    // Handle database connection errors
    if (error instanceof mongoose.Error && error.message.includes("connect")) {
      return NextResponse.json(
        { 
          message: "Database connection failed",
          error: "DB_CONNECTION_ERROR" 
        },
        { status: 503 }
      );
    }

    // Handle all other unexpected errors
    return NextResponse.json(
      { 
        message: "Failed to fetch event",
        error: error instanceof Error ? error.message : "UNKNOWN_ERROR" 
      },
      { status: 500 }
    );
  }
}
