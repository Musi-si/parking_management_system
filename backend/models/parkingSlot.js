const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')
const Location = require('./location')

const ParkingSlot = sequelize.define('ParkingSlot', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true
  },

  locationId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  size: {
    type: DataTypes.ENUM('small', 'medium', 'large'),
    allowNull: false
  },

  status: {
    type: DataTypes.ENUM('available', 'unavailable'),
    allowNull: false,
    defaultValue: 'available'
  },

  pricePerHour: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  }
}, {
  timestamps: true,
  tableName: 'parking_slots'
})

ParkingSlot.belongsTo(Location, {
    foreignKey: { name: 'locationId', allowNull: false },
    as: 'location'
  });
  Location.hasMany(ParkingSlot, {
    foreignKey: 'locationId',
    as: 'slots'
  });

module.exports = ParkingSlot