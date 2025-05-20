// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');   // ← path to the Sequelize instance

const User = sequelize.define(
  'User',
  {
    // id (INTEGER, auto-increment, primary key) is added automatically

    names: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true            // only for readability; Sequelize doesn’t natively trim,
                            // you can use hooks or validations if you want to enforce it
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      lowercase: true,       // this also doesn’t transform automatically—use hooks
      validate: {
        isEmail: true        // built-in email validator
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    role: {
      type: DataTypes.ENUM('user', 'admin'),
      allowNull: false
    },

    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

    verificationToken: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    timestamps: true,        // createdAt / updatedAt
    tableName: 'users'       // explicit table name (optional)
  }
);

module.exports = User;
