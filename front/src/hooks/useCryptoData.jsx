import { useState, useEffect } from 'react';
import { getCryptoPrices, getCryptoMetadata } from '../services/api';

const useCryptoData = () => {
  const [prices, setPrices] = useState(null);
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const priceData = await getCryptoPrices();
      const metadataData = await getCryptoMetadata();
      setPrices(priceData);
      setMetadata(metadataData);
    };
    fetchData();
  }, []);

  return { prices, metadata };
};

export default useCryptoData;