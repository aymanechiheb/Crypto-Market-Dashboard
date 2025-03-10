import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api';

export const getCryptoPrices = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/crypto/prices`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des prix:', error);
    return null;
  }
};

export const getCryptoMetadata = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/crypto/metadata`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des métadonnées:', error);
    return null;
  }
};