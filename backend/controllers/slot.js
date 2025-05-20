const Slot = require('../models/slot')
const Parking = require('../models/parking')

const get_slots = async (req, res) => {
  try {
    const slots = await Slot.findAll({
      include: [
        { model: Parking, as: 'parking' },
      ],
      order: [['createdAt', 'DESC']],
    })
    res.json(slots)
  } catch (e) {
    console.error(e)
    res
      .status(500)
      .json({ message: 'Internal server error', error: e.message })
  }
}

const add_slot = async (req, res) => {
  try {
    const { name, parkingId, status = 'available' } = req.body

    if (!name || !parkingId ) {
      return res.status(400).json({
        message: 'Missing required fields',
        required: ['name', 'parkingId'],
      })
    }

    await Slot.create({
      name,
      parkingId,
      status
    })

    console.log('New slot added successfully')
    return get_slots(req, res)
  } catch (e) {
    console.error(e)
    res
      .status(500)
      .json({ message: 'Internal server error', error: e.message })
  }
}

module.exports = {get_slots, add_slot}