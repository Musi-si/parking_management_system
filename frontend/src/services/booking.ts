import api from './api'

export const getBookings = async() => {
    const res = await api.get('/bookings/all')
    return res.data
}

export const addBooking = async (booking: any) => {
    const res = await api.post('/bookings/add', {
          startTime: booking.startTime,
          endTime: booking.endTime,
          status: booking.status,
        //   isPaid: booking.isPaid,
          amount: booking.amount
    })

    return res.data
}