const axios = require('axios');
const https = require('https');

const fetchCryptoPrices = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,cardano,pi-network,solana,ripple,polkadot,dogecoin,avalanche,litecoin,lido-staked-ether,wrapped-bitcoin,leo-token,TRON,usd-coin,tether,chainlink&vs_currencies=usd', { timeout: 10000 });
      return Object.entries(response.data).map(([cryptoId, priceData]) => ({ cryptoId, price: priceData.usd }));
    } catch (error) {
      console.error('Erreur lors de la récupération des prix :', error);
      throw error;
    }
  }
  ;

const fetchCryptoMetadata = async () => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false', {
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      timeout: 10000,
    });
    return response.data.map(crypto => ({
      cryptoId: crypto.id,
      name: crypto.name,
      symbol: crypto.symbol,
      marketCap: crypto.market_cap,
      volume: crypto.total_volume,
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des métadonnées :', error);
    throw error;
  }
};

module.exports = { fetchCryptoPrices, fetchCryptoMetadata };