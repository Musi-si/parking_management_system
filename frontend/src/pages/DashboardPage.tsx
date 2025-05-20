import React, { useState, useEffect } from 'react'
import { useSlot} from '../context/SlotContext'
import { useAuth } from '../context/AuthContext'
import { Slot } from '../types'
import ParkingSlotGrid from '../components/parking/SlotGrid'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Select from '../components/ui/Select'
import { MapPin, Search } from 'lucide-react'
import { useParking } from '@/context/ParkingContext'
import { Parking } from '../types/index'

const DashboardPage: React.FC = () => {
  const { slots, isLoading, searchSlots } = useSlot()
  const { isAuthenticated } = useAuth()

  const [searchTerm, setSearchTerm] = useState('')
  const [filterParkingation, setFilterParkingation] = useState('')
  const [filteredSlots, setFilteredSlots] = useState<Slot[]>([])

  const { parkings } = useParking()
  const parkingOptions = parkings.map((parking: Parking) => ({value: parking.id, label: `${parking.name} - ${parking.address}`}))

  useEffect(() => {
    const criteria = {
      name: searchTerm || undefined
    }

    const results = searchSlots(criteria)
    setFilteredSlots(results)
  }, [slots, searchTerm, searchSlots])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-200">Find Parking</h1>
        <p className="mt-2 text-gray-300">Browse available parking slots and book your spot</p>
      </div>

      <Card className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 md:col-span-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input type="text" placeholder="Search by slot name" className="pl-10"
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>

          <div className="relative text-gray-400">
            <div className="absolute p-3">
              <MapPin className="h-5 w-5" />
            </div>
            <Select className="pl-10" options={parkingOptions} value={filterParkingation}
              onChange={(e) => setFilterParkingation(e.target.value)} />
          </div>
        </div>
      </Card>

      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-200">Available Parking Slots</h2>
          <div className="flex items-center text-sm text-gray-500">
            <span className="flex items-center">
              <span className="h-3 w-3 bg-green-500 rounded-full mr-1"></span>
              Available
            </span>
            <span className="flex items-center ml-4">
              <span className="h-3 w-3 bg-red-500 rounded-full mr-1"></span>
              Unavailable
            </span>
          </div>
        </div>

        <ParkingSlotGrid slots={filteredSlots} isLoading={isLoading} />
      </div>
    </div>
  )
}

export default DashboardPage