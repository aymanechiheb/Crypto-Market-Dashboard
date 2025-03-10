const cron = require('node-cron');
const { fetchCryptoPrices, fetchCryptoMetadata } = require('./services/cryptoService');
const CryptoPrice = require('./models/CryptoPrice');
const CryptoMetadata = require('./models/CryptoMetadata');

const startCronJobs = () => {
  cron.schedule('*/1 * * * *', async () => {
    try {
      const prices = await fetchCryptoPrices();
      await CryptoPrice.bulkCreate(prices);
      console.log('Données des prix mises à jour');
    } catch (error) {
      console.error('Erreur lors de la mise à jour des prix :', error);
    }
  });

  cron.schedule('*/1 * * * *', async () => {
    try {
      const metadata = await fetchCryptoMetadata();
      await CryptoMetadata.bulkCreate(metadata, { updateOnDuplicate: ['marketCap', 'volume'] });
      console.log('Métadonnées mises à jour');
    } catch (error) {
      console.error('Erreur lors de la mise à jour des métadonnées :', error);
    }
  });
};

module.exports = { startCronJobs };