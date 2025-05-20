const Booking = require('../models/booking')
const ParkingSlot = require('../models/parkingSlot')
const transporter = require('../utils/email')

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { userId: req.user.id },
      include: [{ model: ParkingSlot }],
      order: [['createdAt', 'ASC']],
    })

    res.json(bookings)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error', error: err.message })
  }
}

exports.addBooking = async (req, res) => {
  try {
    const { slotId, startTime, endTime, totalAmount } = req.body

    if (!slotId || !startTime || !endTime || totalAmount == null) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const slot = await ParkingSlot.findByPk(slotId)
    if (!slot) return res.status(404).json({ message: 'Slot not found' })
    if (slot.status !== 'available') {
      return res.status(400).json({ message: 'Slot is not available' })
    }

    const booking = await Booking.create({userId: req.user.id, slotId, startTime, endTime, totalAmount, status: 'pending'})
    const user = await User.findByPk(req.user.id)
    if (user && user.email) {
      await bookingEmail(user.email, booking)
    }

    await slot.update({ status: 'unavailable' })

    res.status(201).json(booking)
  } catch (err) {
    console.error(err)
    res.status(400).json({ message: err.message })
  }
}

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id, {
      include: [{ model: ParkingSlot }],
    })
    if (!booking) return res.status(404).json({ message: 'Booking not found' })

    if (['cancelled', 'completed'].includes(booking.status)) {
      return res.status(400).json({ message: 'Cannot cancel this booking' })
    }

    if (booking.ParkingSlot) {
      await booking.ParkingSlot.update({ status: 'available' })
    }

    res.json(booking)
  } catch (err) {
    console.error(err)
    res.status(400).json({ message: err.message })
  }
}

async function bookingEmail(to, booking) {
  const { startTime, endTime, totalAmount } = booking

  const start = new Date(startTime)
  const end = new Date(endTime)
  const durationInHours = Math.round((end - start) / (1000 * 60 * 60))

  const mailOptions = {
    from: `<${process.env.EMAIL_USER}>`,
    to,
    subject: 'Your Parking Slot Booking Confirmation',
    html: `
      <h2>Booking Confirmation</h2>
      <p>Dear User,</p>
      <p>Your booking was successful. Here are your booking details:</p>
      <ul>
        <li><strong>Start Time:</strong> ${start.toLocaleString()}</li>
        <li><strong>End Time:</strong> ${end.toLocaleString()}</li>
        <li><strong>Duration:</strong> ${durationInHours} hours</li>
        <li><strong>Total Amount:</strong> $${totalAmount.toFixed(2)}</li>
      </ul>
      <p>Thank you for using Smart Parking!</p>
    `,
  }

  await transporter.sendMail(mailOptions)
}