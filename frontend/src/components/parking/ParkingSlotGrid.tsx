import React from 'react'
import { ParkingSlot } from '../../types'
import ParkingSlotItem from './ParkingSlotItem'

interface ParkingSlotGridProps {
  slots: ParkingSlot[]
  onSelectSlot: (slot: ParkingSlot) => void
  isLoading: boolean
}

const ParkingSlotGrid: React.FC<ParkingSlotGridProps> = ({ slots, onSelectSlot, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="text-lg text-gray-700">Loading parking slots...</span>
      </div>
    )
  }

  if (slots.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">No parking slots available.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {slots.map((slot) => (
        <ParkingSlotItem key={slot.id} slot={slot} onSelect={onSelectSlot} />
      ))}
    </div>
  )
}

export default ParkingSlotGrid