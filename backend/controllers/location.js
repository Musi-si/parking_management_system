const Parking = require('../models/parking')

const get_parkings = async (req, res) => {
  try {
    const parkings = await Parking.findAll({
      order: [['createdAt', 'DESC']],
    })
    res.json(parkings)
  } catch (e) {
    console.error(e)
    res
      .status(500)
      .json({ message: 'Internal server error', error: e.message })
  }
}

const add_parking = async (req, res) => {
  try {
    const { name, address } = req.body
    if (!name || !address) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    await Parking.create({ name, address })
    console.log('New parking added successfully')

    return get_parkings(req, res)
  } catch (e) {
    console.error(e)
    res
      .status(500)
      .json({ message: 'Internal server error', error: e.message })
  }
}

module.exports = { get_parkings, add_parking }
