// src/controllers/CryptoController.js
const CryptoPrice = require('../models/CryptoPrice');
const CryptoMetadata = require('../models/CryptoMetadata');

// Récupérer les prix actuels des cryptomonnaies
const getCurrentPrices = async (req, res) => {
  try {
    // Récupérer les prix actuels depuis l'API CoinGecko avec les nouvelles cryptos ajoutées
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,cardano,solana,ripple,polkadot,dogecoin,avalanche,litecoin,lido-staked-ether,wrapped-bitcoin,leo-token,TRON,usd-coin,tether,chainlink&vs_currencies=usd');
    const data = await response.json();

    // Envoyer les données au client
    res.status(200).json(data);
  } catch (error) {
    console.error('Erreur lors de la récupération des prix :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Récupérer l'historique des prix pour une cryptomonnaie donnée
const getPriceHistory = async (req, res) => {
  const { cryptoId } = req.params;

  try {
    // Récupérer l'historique des prix depuis la base de données
    const history = await CryptoPrice.findAll({
      where: { cryptoId },
      order: [['timestamp', 'ASC']], // Trier par date
    });

    // Envoyer les données au client
    res.status(200).json(history);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'historique :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = {
  getCurrentPrices,
  getPriceHistory,
};