import api from './api'

export const getSlots = async() => {
    const res = await api.get('/parking_slots/all')
    return res.data
}

export const getSlot = async (id: any) => {
    const res = await api.get(`/parking_slots/one/id=${id}`)
    return res.data
}

export const addSlot = async (slot: any) => {
    const res = await api.post('/parking_slots/add', {
          name: slot.name,
          size: slot.size,
          status: slot.status,
          pricePerHour: slot.pricePerHour,
          location: slot.location,
    })

    return res.data
}