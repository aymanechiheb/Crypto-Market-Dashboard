// src/models/CryptoPrice.js
const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');

const CryptoPrice = sequelize.define('CryptoPrice', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  cryptoId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(18, 2),
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = CryptoPrice;