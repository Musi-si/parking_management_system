import * as React from 'react'
import { CheckCircle, XCircle } from 'lucide-react'
import { useParking } from '../context/ParkingContext'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import SlotForm from '@/components/parking/SlotForm'
import LocForm from '@/components/parking/LocForm'
import { useLoc } from '@/context/LocContext'

const AdminPage: React.FC = () => {
  const { slots, isLoading } = useParking()
  const { locs } = useLoc()
  
  const [showSlotForm, setShowSlotForm] = React.useState(false)
  const [showLocForm, setShowLocForm] = React.useState(false)

  const openCreateLoc = () => {
    setShowLocForm(true)
  }

  const openCreateSlot = () => {
    setShowSlotForm(true)
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center h-64">
          <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-lg text-gray-400">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-200">Admin Dashboard</h1>
        <p className="mt-2 text-gray-400">Manage all parking slots and bookings</p>
      </div>

      <div className="flex justify-end mb-4 space-x-3">
        <Button variant="primary" onClick={openCreateLoc}>➕ Add Location</Button>
      </div>

      <div className="mb-8">
        <Card title="Parking Locations" className='text-center'>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-900">
                <tr className="text-xs font-medium text-gray-200 uppercase tracking-wider">
                  <th>Name</th>
                  <th>Address</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {locs.map((loc) => (
                  <tr key={loc.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-300">{loc.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">{loc.address}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {showLocForm && (
          <Modal onClose={() => setShowLocForm(false)} title={'Add Location'} isOpen={showLocForm}>
            <LocForm onSuccess={() => {setShowLocForm(false)}} onCancel={() => setShowLocForm(false)} />
          </Modal>
        )}
      </div>

      <div className="flex justify-end mb-4 space-x-3">
        <Button variant="primary" onClick={openCreateSlot}>➕ Add Slots</Button>
      </div>

      <div className="mb-8">
        <Card title="Parking Slots Management" className='text-center'>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-900">
                <tr className="text-xs font-medium text-gray-200 uppercase tracking-wider">
                  <th>Slot</th>
                  <th>Location</th>
                  <th>Price/Hour (RWF)</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {slots.map((slot) => (
                  <tr key={slot.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-300">{slot.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">{slot.location?.name} - {slot.location?.address}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">{slot.pricePerHour}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 inline-flex text-sm leading-5 font-semibold rounded-full ${
                        slot.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {slot.status === 'available' ? (
                          <div className="flex items-center"><CheckCircle size={16} className="mr-1" />Available</div>
                        ) : (
                          <div className="flex items-center"><XCircle size={16} className="mr-1" />Unavailable</div>
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {showSlotForm && (
          <Modal onClose={() => setShowSlotForm(false)} title={'Add Slot'} isOpen={showSlotForm}>
            <SlotForm onSuccess={() => {setShowSlotForm(false)}} onCancel={() => setShowSlotForm(false)} />
          </Modal>
        )}
      </div>
    </div>
  )
}

export default AdminPage