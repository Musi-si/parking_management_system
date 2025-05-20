import React, { createContext, useContext, useEffect, useState } from 'react'
import { Slot } from '../types'
import {getSlots as getSlotsAPI, addSlot as addSlotAPI} from '../services/slot'

type SearchCriteria = {
  name?: string
  size?: 'small' | 'medium' | 'large'
  status?: 'available' | 'unavailable'
  pricePerHour?: number
  location?: string
  isLoading: boolean
}

type SlotontextType = {
  slots: Slot[]
  addSlot: (slot: Omit<Slot, 'id'>) => void
  searchSlots: (criteria: SearchCriteria) => Slot[]
}

const SlotContext = createContext<SlotContextType | null>(null)

export const useSlot = () => {
  const context = useContext(SlotContext)
  if (!context) throw new Error('useSlot must be used within SlotProvider')
  return context
}

export const SlotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [slots, setSlots] = useState<Slot[]>([])

  useEffect(() => {
    const getSlots = async () => {
      const data = await getSlotsAPI()
      setSlots(data)
    }
    getSlots()
  }, [])

  const addSlot = async (slot: Omit<Slot, 'id'>) => {
    const newSlot = await addSlotAPI(slot)
    setSlots(prev => [...prev, newSlot])
  }

  const searchSlots = (criteria: SearchCriteria): Slot[] => {
    return slots.filter(slot => {
      return (
        (!criteria.name || slot.name.toLowerCase().includes(criteria.name.toLowerCase()))
      )
    })
  }

  return (
    <SlotContext.Provider value={{ slots, addSlot, searchSlots }}>
      {children}
    </SlotContext.Provider>
  )
}