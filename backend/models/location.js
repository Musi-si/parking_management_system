const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // adjust path to your sequelize instance

const Location = sequelize.define('Location', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true,  // automatically adds createdAt and updatedAt
  tableName: 'locations' // optional: specify the table name explicitly
});

module.exports = Location;
