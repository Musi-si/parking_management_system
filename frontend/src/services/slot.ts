import api from './api'

export const getSlots = async() => {
    const res = await api.get('/slots/all')
    return res.data
}

export const getSlot = async (id: any) => {
    const res = await api.get(`/slots/one/id=${id}`)
    return res.data
}

export const addSlot = async (slot: any) => {
    const res = await api.post('/slots/add', {
          name: slot.name,
          size: slot.size,
          status: slot.status,
          pricePerHour: slot.pricePerHour,
          location: slot.location,
    })

    return res.data
}