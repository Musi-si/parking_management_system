import React, { useEffect } from 'react';
import { useBooking } from '../context/BookingContext';
import BookingList from '../components/booking/BookingList';

const BookingsPage: React.FC = () => {
  const { bookings, isLoading, fetchUserBookings, cancelBooking } = useBooking();

  useEffect(() => {
    fetchUserBookings();
  }, [fetchUserBookings]);

  const handleCancelBooking = async (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      await cancelBooking(bookingId)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-200">My Bookings</h1>
        <p className="mt-2 text-gray-200">View and manage your parking bookings</p>
      </div>

      <BookingList bookings={bookings} onCancelBooking={handleCancelBooking} isLoading={isLoading} />
    </div>
  )
}

export default BookingsPage