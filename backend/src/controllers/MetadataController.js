// src/controllers/MetadataController.js
const CryptoMetadata = require('../models/CryptoMetadata');

// Récupérer la liste des cryptomonnaies avec leurs métadonnées
const getAllMetadata = async (req, res) => {
  try {
    // Récupérer toutes les métadonnées depuis la base de données
    const metadata = await CryptoMetadata.findAll();

    // Envoyer les données au client
    res.status(200).json(metadata);
  } catch (error) {
    console.error('Erreur lors de la récupération des métadonnées :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Récupérer les métadonnées d'une cryptomonnaie spécifique
const getMetadataById = async (req, res) => {
  const { id } = req.params;

  try {
    // Récupérer les métadonnées de la cryptomonnaie spécifique
    const metadata = await CryptoMetadata.findOne({ where: { cryptoId: id } });

    if (!metadata) {
      return res.status(404).json({ message: 'Cryptomonnaie non trouvée' });
    }

    // Envoyer les données au client
    res.status(200).json(metadata);
  } catch (error) {
    console.error('Erreur lors de la récupération des métadonnées :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = {
  getAllMetadata,
  getMetadataById,
};