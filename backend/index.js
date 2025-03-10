const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cron = require('node-cron');
const axios = require('axios');
const https = require('https');
const sequelize = require('./src/config/db');
const CryptoPrice = require('./src/models/CryptoPrice');
const CryptoMetadata = require('./src/models/CryptoMetadata');
const routes = require('./src/routes/routes');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*', methods: ['GET', 'POST'] }));
app.use('/api', routes);

sequelize.sync()
  .then(() => console.log('Base de données connectée'))
  .catch((err) => console.error('Erreur de connexion à la base de données :', err));

cron.schedule('*/5 * * * *', async () => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,cardano,solana,ripple,polkadot,dogecoin,avalanche,litecoin&vs_currencies=usd', { timeout: 10000 });
    const data = response.data;
    const prices = Object.entries(data).map(([cryptoId, priceData]) => ({ cryptoId, price: priceData.usd }));
    await CryptoPrice.bulkCreate(prices);
    console.log('Données des prix mises à jour');
  } catch (error) {
    console.error('Erreur lors de la mise à jour des prix :', error);
  }
});

cron.schedule('0 * * * *', async () => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false', {
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      timeout: 10000,
    });
    const data = response.data;
    const metadata = data.map(crypto => ({
      cryptoId: crypto.id,
      name: crypto.name,
      symbol: crypto.symbol,
      marketCap: crypto.market_cap,
      volume: crypto.total_volume,
    }));
    await CryptoMetadata.bulkCreate(metadata, { updateOnDuplicate: ['marketCap', 'volume'] });
    console.log('Métadonnées mises à jour');
  } catch (error) {
    console.error('Erreur lors de la mise à jour des métadonnées :', error);
  }
});

const io = new Server(server, { cors: { origin: process.env.ALLOWED_ORIGIN || '*', methods: ['GET', 'POST'] } });
io.on('connection', (socket) => {
  console.log('Utilisateur connecté');
  const sendCryptoUpdates = async () => {
    const latestPrices = await CryptoPrice.findAll({ order: [['timestamp', 'DESC']], limit: 10 });
    const data = latestPrices.reduce((acc, price) => { acc[price.cryptoId] = { usd: price.price }; return acc; }, {});
    socket.emit('cryptoUpdate', data);
  };
  const interval = setInterval(sendCryptoUpdates, 5000);
  socket.on('disconnect', () => { clearInterval(interval); console.log('Utilisateur déconnecté'); });
});

process.on('unhandledRejection', (err) => { console.error('Erreur non gérée :', err); process.exit(1); });
process.on('uncaughtException', (err) => { console.error('Exception non capturée :', err); process.exit(1); });

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Serveur backend en écoute sur le port ${PORT}`));
