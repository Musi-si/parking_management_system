import React, {createContext, useContext, useState, useEffect} from 'react'
import { Booking } from '../types'
import { useAuth } from './AuthContext'
import { getBookings as getBookingsAPI, addBooking as addBookingAPI } from '../services/booking'

interface BookingContextType {
  bookings: Booking[]
  addBooking: (booking: Omit<Booking, 'id'>) => Promise<void>
  isLoading: boolean
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export const useBooking = (): BookingContextType => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within a BookingProvider')
  return ctx
}

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const { user, isAuthenticated } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    const getBookings = async () => {
      if (!isAuthenticated || !user) return
      
      const res = await getBookingsAPI()
      setBookings(res.data)
    }
    getBookings()
  }, [isAuthenticated, user])

  const addBooking = async (booking: Omit<Booking, 'id'>) => {
    if (!isAuthenticated || !user) return;

    const newBooking = await addBookingAPI(booking)
    setBookings(prev => [...prev, newBooking])
  }

  return (
    <BookingContext.Provider value={{bookings, addBooking, isLoading}}>{children}</BookingContext.Provider>
  )
}