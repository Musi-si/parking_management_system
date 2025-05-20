import React from 'react'
import { Booking } from '../../types'
import BookingItem from './BookingItem'

interface BookingListProps {
  bookings: Booking[]
  onCancelBooking: (id: string) => void
  isLoading: boolean
}

const BookingList: React.FC<BookingListProps> = ({ bookings, onCancelBooking, isLoading }) => {
  // Group bookings by status
  const activeBookings = bookings.filter(booking => 
    booking.status === 'confirmed' || booking.status === 'pending'
  )
  
  const pastBookings = bookings.filter(booking => 
    booking.status === 'completed' || booking.status === 'cancelled'
  )

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="text-lg text-gray-200">Loading bookings...</span>
      </div>
    )
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-200 text-lg">You don't have any bookings yet.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {activeBookings.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-200 mb-4">Active Bookings</h2>
          <div className="space-y-4">
            {activeBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} onCancel={onCancelBooking} />
            ))}
          </div>
        </div>
      )}
      
      {pastBookings.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Past Bookings</h2>
          <div className="space-y-4">
            {pastBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} onCancel={onCancelBooking} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default BookingList