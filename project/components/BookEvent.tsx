'use client';

import { createBooking } from '@/lib/actions/booking.actions';
import posthog from 'posthog-js';
import React, { useState } from 'react';

const BookEvent = ({ eventId }: { eventId: string }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Client-side email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address (e.g., user@example.com)");
      return;
    }
    
    setIsLoading(true);

    try {
      const { success, error: bookingError } = await createBooking({ eventId, email });

      if (success) {
        setSubmitted(true);
        posthog.capture('event_booked', { eventId, email });
      } else {
        const errorMessage = bookingError || "Booking creation has failed";
        setError(errorMessage);
        console.error("Booking creation has failed:", bookingError);
        posthog.captureException("Booking creation has failed");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      console.error("Error during booking:", err);
      posthog.captureException(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id='book-event'>
      {submitted ? (
        <p className='text-sm'>Thank you for signing up!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>

            <input
              type="email"
              value={email}
              id='email'
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your Email address (e.g., user@example.com)'
              required
              disabled={isLoading}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}

          <button
            type='submit'
            className='button-submit'
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;