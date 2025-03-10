// src/routes.js
const express = require('express');
const CryptoController = require('../controllers/CryptoController');
const MetadataController = require('../controllers/MetadataController');

const router = express.Router();

// Routes pour les prix des cryptomonnaies
router.get('/crypto/prices', CryptoController.getCurrentPrices);
router.get('/crypto/history/:cryptoId', CryptoController.getPriceHistory);

// Routes pour les métadonnées des cryptomonnaies
router.get('/crypto/metadata', MetadataController.getAllMetadata);
router.get('/crypto/metadata/:id', MetadataController.getMetadataById);

module.exports = router;