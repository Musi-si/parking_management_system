// controllers/parkingSlot.js  (Sequelize version)

const ParkingSlot = require('../models/parkingSlot')
const Location = require('../models/location')

/* -------------------------------------------------------------------------- */
/*  GET /parking_slots/all                                                    */
/* -------------------------------------------------------------------------- */
const get_slots = async (req, res) => {
  try {
    const slots = await ParkingSlot.findAll({
      include: [
        { model: Location, as: 'location' },
      ],
      order: [['createdAt', 'DESC']],
    });
    res.json(slots);
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ message: 'Internal server error', error: e.message });
  }
};

/* -------------------------------------------------------------------------- */
/*  GET /parking_slots/id=:id                                                 */
/* -------------------------------------------------------------------------- */
const get_slot = async (req, res) => {
  try {
    const slot = await ParkingSlot.findByPk(req.params.id, {
      include: [
        { model: Location, as: 'location' },
      ],
    });

    if (!slot) {
      return res.status(404).json({ message: 'Parking slot not found' });
    }
    res.json(slot);
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ message: 'Internal server error', error: e.message });
  }
};

// /* -------------------------------------------------------------------------- */
// /*  PATCH /parking_slots/changeAvailability?id=:id                            */
// /* -------------------------------------------------------------------------- */
// const change_availability = async (req, res) => {
//   try {
//     const slot = await ParkingSlot.findByPk(req.query.id);
//     if (!slot) return res.status(404).json({ message: 'Slot not found' });

//     const { status } = req.body;
//     await slot.update({
//       status: status ?? slot.status
//     });

//     console.log('Parking slot availability updated successfully');
//     return get_slots(req, res);
//   } catch (e) {
//     console.error(e);
//     res
//       .status(500)
//       .json({ message: 'Internal server error', error: e.message });
//   }
// };

/* -------------------------------------------------------------------------- */
/*  POST /parking_slots/add                                                   */
/* -------------------------------------------------------------------------- */
const add_slot = async (req, res) => {
  try {
    const { name, size, pricePerHour, location, status = 'available' } =
      req.body;

    if (!name || !size || !pricePerHour || !location) {
      return res.status(400).json({
        message: 'Missing required fields',
        required: ['name', 'size', 'pricePerHour', 'location'],
      });
    }

    await ParkingSlot.create({
      name,
      size,
      pricePerHour,
      locationId: location,
      status
    });

    console.log('New parking slot added successfully');
    return get_slots(req, res);
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ message: 'Internal server error', error: e.message });
  }
};

// /* -------------------------------------------------------------------------- */
// /*  PUT /parking_slots/updated?id=:id                                         */
// /* -------------------------------------------------------------------------- */
// const update_slot = async (req, res) => {
//   try {
//     const slot = await ParkingSlot.findByPk(req.query.id);
//     if (!slot) return res.status(404).json({ message: 'Slot not found' });

//     const {
//       name,
//       size,
//       status,
//       pricePerHour,
//       location,
//     } = req.body;

//     await slot.update({
//       name: name ?? slot.name,
//       size: size ?? slot.size,
//       status: status ?? slot.status,
//       pricePerHour: pricePerHour ?? slot.pricePerHour,
//       locationId: location ?? slot.locationId,
//     });

//     console.log('Parking slot info updated successfully');
//     return get_slots(req, res);
//   } catch (e) {
//     console.error(e);
//     res
//       .status(500)
//       .json({ message: 'Internal server error', error: e.message });
//   }
// };

// /* -------------------------------------------------------------------------- */
// /*  DELETE /parking_slots/delete?id=:id                                       */
// /* -------------------------------------------------------------------------- */
// const delete_slot = async (req, res) => {
//   try {
//     const slot = await ParkingSlot.findByPk(req.query.id);
//     if (!slot) return res.status(404).json({ message: 'Slot not found' });

//     await slot.destroy();
//     console.log('Parking slot has been deleted successfully');
//     return get_slots(req, res);
//   } catch (e) {
//     console.error(e);
//     res
//       .status(500)
//       .json({ message: 'Internal server error', error: e.message });
//   }
// };

module.exports = {
  get_slots,
  get_slot,
  add_slot,
};
