// src/models/index.js
const CryptoPrice = require('./CryptoPrice');
const CryptoMetadata = require('./CryptoMetadata');

// Relation entre CryptoPrice et CryptoMetadata
CryptoPrice.belongsTo(CryptoMetadata, { foreignKey: 'cryptoId', targetKey: 'cryptoId' });
CryptoMetadata.hasMany(CryptoPrice, { foreignKey: 'cryptoId' });

module.exports = {
  CryptoPrice,
  CryptoMetadata,
};