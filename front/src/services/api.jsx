import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getCryptoPrices = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/crypto/prices`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des prix:', error);
    return null;
  }
};

export const getCryptoMetadata = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/crypto/metadata`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des métadonnées:', error);
    return null;
  }
  
};
export const getCryptoPriceHistory = async (cryptoId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/crypto/history/${cryptoId}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'historique des prix de ${cryptoId}:`, error);
    return [];
  }
};
