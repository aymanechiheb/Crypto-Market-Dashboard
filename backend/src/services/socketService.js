const CryptoPrice = require('../models/CryptoPrice');

const sendCryptoUpdates = async (socket) => {
  const interval = setInterval(async () => {
    try {
      const latestPrices = await CryptoPrice.findAll({ order: [['timestamp', 'DESC']], limit: 10 });
      const data = latestPrices.reduce((acc, price) => {
        acc[price.cryptoId] = { usd: price.price };
        return acc;
      }, {});
      socket.emit('cryptoUpdate', data);
      console.log("Données envoyées à l'utilisateur", data);
    } catch (error) {
      console.error('Erreur lors de lenvoi des mises à jour crypto :', error);
    }
  }, 5000);

  socket.on('disconnect', () => clearInterval(interval));
};

module.exports = { sendCryptoUpdates };
