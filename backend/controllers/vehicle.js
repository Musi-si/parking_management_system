const Vehicle = require('../models/vehicle')
const Slot = require('../models/slot')
const Parking = require('../models/parking')

exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll({ where: { userId: req.user.id } })
    res.json(vehicles)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to fetch vehicles', error: err.message })
  }
}

exports.addVehicle = async (req, res) => {
  try {
    const { plateNumber, parkingCode, entryDateTime } = req.body

    if (!plateNumber) return res.status(400).json({ message: 'License plate is required' })

    const vehicle = await Vehicle.create({userId: req.user.id, plateNumber, parkingCode, entryDateTime})

    res.status(201).json(vehicle)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to add vehicle', error: err.message })
  }
}

exports.exited = async (req, res) => {
  try {
    const start = req.query.startDate
    const end = req.query.endDate

    if (!start || !end) {
      return res.status(400).json({ message: 'Please provide startDate and endDate' })
    }

    const vehicles = await Vehicle.findAll()

    const outgoingCars = vehicles.filter(v => {
      return v.exitDateTime &&
        new Date(v.exitDateTime) >= new Date(start) &&
        new Date(v.exitDateTime) <= new Date(end)
    })

    let total = 0
    outgoingCars.forEach(v => {
      total += v.chargedAmount || 0
    })

    res.json({ cars: outgoingCars, totalChargedAmount: total })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Something went wrong', error: err.message })
  }
}

exports.entered = async (req, res) => {
  try {
    const start = req.query.startDate
    const end = req.query.endDate

    if (!start || !end) {
      return res.status(400).json({ message: 'Please provide startDate and endDate' })
    }

    const vehicles = await Vehicle.findAll()

    const enteredCars = vehicles.filter(v => {
      return v.entryDateTime &&
        new Date(v.entryDateTime) >= new Date(start) &&
        new Date(v.entryDateTime) <= new Date(end)
    })

    res.json({ cars: enteredCars })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Something went wrong', error: err.message })
  }
}

exports.carEntry = async (req, res) => {
  try {
    const { plateNumber, parkingCode } = req.body
    if (!plateNumber) return res.status(400).json({ message: 'Plate number is required' })

    const entryTime = new Date()

    await Vehicle.create({ userId: req.user.id, plateNumber, parkingCode, entryDateTime: entryTime })

    await Parking.decrement('availableSlots', { where: { id: parkingCode } })

    res.status(201).json({
      message: 'Car entry registered. Ticket issued.',
      ticket: {
        plateNumber,
        entryTime: entryTime.toISOString(),
        parkingCode,
      },
    })
  } catch (err) {
    res.status(500).json({ message: 'Error during car entry', error: err.message })
  }
}

exports.carExit = async (req, res) => {
  try {
    const { plateNumber } = req.body

    const vehicle = await Vehicle.findOne({ where: { plateNumber, exitDateTime: null } })
    if (!vehicle) return res.status(404).json({ message: 'No entry found for this plate number' })

    const exitTime = new Date()
    const entryTime = new Date(vehicle.entryDateTime)
    const hoursParked = Math.ceil((exitTime - entryTime) / (1000 * 60 * 60))
    const fee = Parking.findOne({ where: parkingCode === vehicle.parkingCode })
    const totalAmount = hoursParked * fee

    await vehicle.update({ exitDateTime: exitTime, chargedAmount: totalAmount })

    await Parking.increment('availableSlots', { where: { id: vehicle.parkingCode } })

    res.json({
      message: 'Bill calculated, car may now exit.',
      bill: {
        plateNumber,
        entryTime: entryTime.toLocaleString(),
        exitTime: exitTime.toLocaleString(),
        hoursParked,
        totalAmount,
      },
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Error during car exit', error: err.message })
  }
}