import React, { useEffect, useState } from 'react';
import useCryptoData from '../hooks/useCryptoData';
import useWebSocket from '../hooks/useWebSocket';
import CryptoCard from '../components/CryptoCard';
import CryptoChart from '../components/CryptoChart';

const Dashboard = () => {
  const { prices, metadata, isLoading, error } = useCryptoData();
  const { cryptoData, isSocketLoading } = useWebSocket();

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (cryptoData) {
      const formattedData = Object.entries(cryptoData).map(([timestamp, value]) => ({
        timestamp,
        price: value.usd,
      }));
      setChartData(formattedData);
    }
  }, [cryptoData]);

  // Handle loading and error states
  if (isLoading || isSocketLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <span>Loading data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <span>Error loading data. Please try again later.</span>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 min-h-screen text-white">
      <div className="p-6">
       

        {/* Crypto Cards Section */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          {Array.isArray(metadata) && metadata.length > 0 ? (
            metadata.map((crypto) => (
              <CryptoCard
                key={crypto.cryptoId}
                name={crypto.name}
                price={cryptoData?.[crypto.cryptoId]?.usd || prices[crypto.cryptoId]?.usd}
                symbol={crypto.symbol}
              />
            ))
          ) : (
            <div className="text-center text-gray-500">No cryptocurrency data available</div>
          )}
        </div>

        {/* Chart Section */}
      
          {chartData.length > 0 ? (
            <CryptoChart data={chartData} />
          ) : (
            <div className="text-center text-gray-500">No chart data available</div>
          )}
        </div>
      </div>
   
  );
};

export default Dashboard;
