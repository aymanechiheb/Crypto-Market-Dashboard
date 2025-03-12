// src/models/CryptoMetadata.js
const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');

const CryptoMetadata = sequelize.define('CryptoMetadata', {
  cryptoId: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  symbol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  marketCap: {
    type: DataTypes.DECIMAL(18, 2),
    allowNull: true,
  },
  volume: {
    type: DataTypes.DECIMAL(18, 2),
    allowNull: true,
  },
});

module.exports = CryptoMetadata;