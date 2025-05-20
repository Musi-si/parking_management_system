import React, { createContext, useContext, useEffect, useState } from 'react'
import { ParkingSlot } from '../types'
import {getSlots as getSlotsAPI, addSlot as addSlotAPI} from '../services/parking'

type SearchCriteria = {
  name?: string
  size?: 'small' | 'medium' | 'large'
  status?: 'available' | 'unavailable'
  pricePerHour?: number
  location?: string
  isLoading: boolean
}

type ParkingContextType = {
  slots: ParkingSlot[]
  addSlot: (slot: Omit<ParkingSlot, 'id'>) => void
  searchSlots: (criteria: SearchCriteria) => ParkingSlot[]
}

const ParkingContext = createContext<ParkingContextType | null>(null)

export const useParking = () => {
  const context = useContext(ParkingContext)
  if (!context) throw new Error('useParking must be used within ParkingProvider')
  return context
}

export const ParkingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [slots, setSlots] = useState<ParkingSlot[]>([])

  useEffect(() => {
    const getSlots = async () => {
      const data = await getSlotsAPI()
      setSlots(data)
    }
    getSlots()
  }, [])

  const addSlot = async (slot: Omit<ParkingSlot, 'id'>) => {
    const newSlot = await addSlotAPI(slot)
    setSlots(prev => [...prev, newSlot])
  }

  const searchSlots = (criteria: SearchCriteria): ParkingSlot[] => {
    return slots.filter(slot => {
      return (
        (!criteria.name || slot.name.toLowerCase().includes(criteria.name.toLowerCase()))
      )
    })
  }

  return (
    <ParkingContext.Provider value={{ slots, addSlot, searchSlots }}>
      {children}
    </ParkingContext.Provider>
  )
}