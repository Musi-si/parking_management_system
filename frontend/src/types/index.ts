export interface User {
  id: number
  names: string
  email: string
  role: 'user' | 'admin'
}

export interface Slot {
  id: number
  name: string
  size: 'small' | 'medium' | 'large'
  status: 'available' | 'unavailable'
  pricePerHour: number
  parking: number
}

export interface Vehicle {}

export interface Parking {
  id: number
  name: string
  address: string
}

export interface Booking {
  id: number
  userId: number
  slotId: number
  startTime: string
  endTime: string
  totalAmount: number
  isPaid: boolean
  status: 'pending' | 'completed' | 'cancelled'
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

// export interface ParkingState {
//   slots: ParkingSlot[]
//   isLoading: boolean
//   error: string | null
// }

// export interface BookingState {
//   bookings: Booking[]
//   currentBooking: Booking | null
//   isLoading: boolean
//   error: string | null
// }