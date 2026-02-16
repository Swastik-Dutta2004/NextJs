import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IBooking extends Document {
  eventId: mongoose.Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      validate: {
        validator: (v: string) => {
          const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          return emailRegex.test(v);
        },
        message: 'Please provide a valid email address (e.g., user@example.com)',
      },
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.index({ eventId: 1 });

/**
 * Pre-save hook to validate that the referenced event exists
 */
bookingSchema.pre('save', async function () {
  // Only validate eventId if it's new or modified
  if (this.isModified('eventId')) {
    const Event = mongoose.models.Event || (await import('./event.model')).default;
    
    const eventExists = await Event.findById(this.eventId);
    
    if (!eventExists) {
      throw new Error('Referenced event does not exist');
    }
  }
});

const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>('Booking', bookingSchema);

export default Booking;