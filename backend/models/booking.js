const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/db')
const ParkingSlot = require('../models/parkingSlot')

class Booking extends Model {}

Booking.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    slotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
      allowNull: false,
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    modelName: 'booking',
    timestamps: true,
  }
)

Booking.belongsTo(ParkingSlot, { foreignKey: 'slotId' })

ParkingSlot.hasMany(Booking, { foreignKey: 'slotId' })

module.exports = Booking