import React, { useState } from 'react'
import { Booking, ParkingSlot } from '../../types'
import Button from '../ui/Button'
import Input from '../ui/Input'
import { useBooking } from '../../context/BookingContext'
import { useAuth } from '../../context/AuthContext'

interface BookingFormProps {
  slot: ParkingSlot
  onSuccess: () => void
  onCancel: () => void
}

const BookingForm: React.FC<BookingFormProps> = ({ slot, onSuccess, onCancel }) => {
  const { user } = useAuth()
  const { addBooking, isLoading } = useBooking()

  const [startDate, setStartDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [duration, setDuration] = useState(1)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const calculateEndDateTime = () => {
    if (!startDate || !startTime) return null
    
    const start = new Date(`${startDate}T${startTime}`)
    const end = new Date(start.getTime() + duration * 60 * 60 * 1000)
    
    return end
  }

  const calculateTotalPrice = () => {
    return duration * slot.pricePerHour
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors: { [key: string]: string } = {}
    
    if (!startDate) newErrors.startDate = 'Start date is required'
    
    if (!startTime) newErrors.startTime = 'Start time is required'
    
    if (duration < 1) newErrors.duration = 'Minimum booking is 1 hour'
    
    const startDateTime = new Date(`${startDate}T${startTime}`)
    if (startDateTime <= new Date()) newErrors.startTime = 'Start time must be in the future'
    
    setErrors(newErrors)    
    if (Object.keys(newErrors).length > 0) return
    
    const endDateTime = calculateEndDateTime()
    if (!endDateTime) return

      const totalAmount = duration * slot.pricePerHour

    const data = {
      slotId: slot.id,
      startTime: startDateTime.toISOString(), 
      endTime: endDateTime.toISOString(),
      totalAmount,
      // status: 'pending' as Booking['status'],
      // duration,
      // isPaid: false,
      // userId: user.id
    }
    
    try {
      await addBooking(data)
      onSuccess()
    } catch (error) {
      console.error('Failed to create booking:', error)
    }
  }

  const endDateTime = calculateEndDateTime()
  const totalPrice = calculateTotalPrice()

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-dark-800 border border-primary-600 p-4 rounded-lg mb-4">
        <h3 className="font-medium text-gray-200">Booking Details</h3>
        <p className="text-gray-400 text-sm mt-1">Slot {slot.name} at {slot.location?.name} - {slot.location?.address}</p>
        <p className="text-gray-400 font-medium mt-1">${slot.pricePerHour} / hour</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input type="date" label="Start Date" onChange={(e) => setStartDate(e.target.value)}
          value={startDate} min={new Date().toISOString().split('T')[0]} error={errors.startDate} />
        
        <Input type="time" label="Start Time" value={startTime} error={errors.startTime}
          onChange={(e) => setStartTime(e.target.value)} />
      </div>
      
      <div>
        <label className="block text-gray-200 text-sm font-medium mb-1">Duration (hours)</label>
        <input type="number" value={duration} min="1" onChange={(e) => setDuration(Number(e.target.value))}
          max="24" className="w-16 text-center py-2 bg-gray-800 text-gray-400 border border-gray-700" />

        {errors.duration && (
          <p className="mt-1 text-sm text-red-600">{errors.duration}</p>
        )}
      </div>
      
      {startDate && startTime && endDateTime && (
        <div className="bg-dark-800 border border-primary-600 p-4 rounded-lg">
          <div className="flex justify-between mb-2">
            <span className="text-gray-300">End Time:</span>
            <span className="font-medium text-gray-300">
              {endDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          <div className="flex justify-between font-medium">
            <span className="text-gray-300">Total Price:</span>
            <span className="text-gray-300">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      )}
      
      <div className="flex space-x-4">
        <Button type="button" variant="outline" className="flex-1 hover:bg-gray-700" onClick={onCancel}>Cancel</Button>
        <Button type="submit" className="flex-1" isLoading={isLoading}>Confirm Booking</Button>
      </div>
    </form>
  )
}

export default BookingForm