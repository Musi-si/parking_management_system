import api from './api'

export const getLocs = async() => {
    const res = await api.get('/locations/all')
    return res.data
}

export const addLoc = async (loc: any) => {
    const res = await api.post('/locations/add', {
          name: loc.name,
          address: loc.address
    })

    return res.data
}