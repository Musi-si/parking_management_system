// controllers/location.js   (Sequelize version)

const Location = require('../models/location')

/* -------------------------------------------------------------------------- */
/*  GET /locations/all                                                        */
/* -------------------------------------------------------------------------- */
const get_locations = async (req, res) => {
  try {
    const locations = await Location.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json(locations);
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ message: 'Internal server error', error: e.message });
  }
};

/* -------------------------------------------------------------------------- */
/*  POST /locations/add                                                       */
/* -------------------------------------------------------------------------- */
const add_location = async (req, res) => {
  try {
    const { name, address } = req.body;
    if (!name || !address) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    await Location.create({ name, address });
    console.log('New location added successfully');

    // respond with refreshed list
    return get_locations(req, res);
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ message: 'Internal server error', error: e.message });
  }
};

module.exports = { get_locations, add_location };
