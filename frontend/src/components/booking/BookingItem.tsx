import React from 'react'
import { Booking } from '../../types'
import Card from '../ui/Card'
import Button from '../ui/Button'
import { Calendar, Clock, DollarSign, CheckCircle, AlertCircle, XCircle } from 'lucide-react'

interface BookingItemProps {
  booking: Booking;
  onCancel: (id: string) => void;
}

const BookingItem: React.FC<BookingItemProps> = ({ booking, onCancel }) => {
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600 bg-green-50'
      case 'pending':
        return 'text-yellow-600 bg-yellow-50'
      case 'cancelled':
        return 'text-red-600 bg-red-50'
      case 'completed':
        return 'text-blue-600 bg-blue-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle size={16} className="text-green-600" />
      case 'pending':
        return <Clock size={16} className="text-yellow-600" />
      case 'cancelled':
        return <XCircle size={16} className="text-red-600" />
      case 'completed':
        return <CheckCircle size={16} className="text-blue-600" />
      default:
        return <AlertCircle size={16} className="text-gray-600" />
    }
  };

  const isPastBooking = new Date(booking.endTime) < new Date()
  const canCancel = booking.status !== 'cancelled' && booking.status !== 'completed' && !isPastBooking

  return (
    <Card className="transition-all duration-200 hover:shadow-lg">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
        <div>
          <div className="flex items-center mb-2">
            <span className={`text-xs font-medium flex items-center px-2.5 py-0.5 rounded ${getStatusColor(booking.status)}`}>
              {getStatusIcon(booking.status)}
              <span className="ml-1 capitalize text-sm">{booking.status}</span>
            </span>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-200">Parking Slot #{booking.slotId}</h3>
          
          <div className="mt-3 space-y-2">
            <div className="flex items-center text-gray-400">
              <Calendar size={20} className="mr-2 text-gray-400" />
              <div>
                <p className="text-sm">Start: {formatDateTime(booking.startTime)}</p>
                <p className="text-sm">End: {formatDateTime(booking.endTime)}</p>
              </div>
            </div>
            
            <div className="flex items-center text-gray-400">
              <DollarSign size={20} className="mr-2 text-gray-400" />
              <span>
                ${booking.totalAmount.toFixed(2)}
                {booking.isPaid ? (
                  <span className="ml-2 text-green-600 text-xs font-medium">PAID</span>
                ) : (
                  <span className="ml-2 text-yellow-600 text-xs font-medium">UNPAID</span>
                )}
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 sm:mt-0">
          {canCancel && (
            <Button variant="danger" size="sm" onClick={() => onCancel(booking.id)}>Cancel Booking</Button>
          )}
        </div>
      </div>
    </Card>
  )
}

export default BookingItem