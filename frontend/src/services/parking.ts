import api from './api'

export const getParkings = async() => {
    const res = await api.get('/parkings/all')
    return res.data
}

export const addParking = async (parking: any) => {
    const res = await api.post('/parkings/add', {
          name: parking.name,
          address: parking.address
    })

    return res.data
}