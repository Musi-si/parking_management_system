
require( 'dotenv' ).config()

const express = require( 'express' )
const cors = require( 'cors' )
const { swaggerUi, swaggerSpec } = require( './swagger' )

const auth_routes = require( './routes/auth' )
const parking_slot_routes = require( './routes/parkingSlot' )
const location_routes = require( './routes/location' )
const booking_routes = require('./routes/booking')

const sequelize = require( './config/db' )
// require('./models')


// const Booking = require('../models/booking')
// const ParkingSlot = require('../models/parkingSlot')

const app = express()

app.use( express.json() )
app.use( cors() )
app.use( '/api-docs', swaggerUi.serve, swaggerUi.setup( swaggerSpec ) )

app.use( '/auth', auth_routes )
app.use( '/parking_slots', parking_slot_routes )
app.use( '/locations', location_routes )
app.use('/bookings', booking_routes)

const PORT = process.env.PORT || 45000;

(async () => {
  try {
    // Establish MySQL connection
    await sequelize.authenticate();
    console.log('✅  MySQL connection has been established successfully.');

    // Sync models (remove `force: true` in production)
    await sequelize.sync();   // or { alter: true } for gentle migrations
    console.log('🗄️   All models were synchronized successfully.');

    app.listen(PORT, () =>
      console.log(`🚗  Parking Management Server running on port ${PORT}`),
    );
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  }
})();