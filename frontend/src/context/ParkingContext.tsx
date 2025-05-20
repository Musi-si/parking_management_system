import React, { createContext, useContext, useEffect, useState } from 'react'
import { Parking } from '../types'
import { getParkings as getParkingsAPI, addParking as addParkingAPI } from '../services/parking'

type ParkingContextType = {
  parkings: Parking[]
  addParking: (parking: Omit<Parking, 'id'>) => Promise<void>
}

const ParkingContext = createContext<ParkingContextType | null>(null)

export const useParking = () => {
  const context = useContext(ParkingContext)
  if (!context) throw new Error('useParking must be used within ParkingProvider')
  return context
}

export const ParkingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [parkings, setParkings] = useState<Parking[]>([])

  useEffect(() => {
    const getParkings = async () => {
      const data = await getParkingsAPI()
      setParkings(data)
    }
    getParkings()
  }, [])

  const addParking = async (parking: Omit<Parking, 'id'>) => {
    const new_parking = await addParkingAPI(parking)
    setParkings(prev => [...prev, new_parking])
  }

  return (
    <ParkingContext.Provider value={{ parkings, addParking }}>{children}</ParkingContext.Provider>
  )
}