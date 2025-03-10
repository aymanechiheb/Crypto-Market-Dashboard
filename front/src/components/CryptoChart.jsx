import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import TimeUnitFilter from './TimeUnitFilter';

const CryptoChart = ({ data, timeUnit, setTimeUnit, isLoading }) => {
  const coins = Object.keys(data[0] || {}).filter((key) => key !== 'timestamp');

  // Find the maximum and minimum price values to adjust the Y-axis domain dynamically
  const allPrices = data.flatMap(item => coins.map(coin => item[coin]));
  const maxPrice = Math.max(...allPrices);
  const minPrice = Math.min(...allPrices);

  // Function to calculate Y-axis domain with padding
  const calculateYAxisDomain = (minPrice, maxPrice) => {
    const range = maxPrice - minPrice;
    const padding = range * 0.1; // Add 10% padding
    return [Math.floor(minPrice - padding), Math.ceil(maxPrice + padding)];
  };

  const yAxisDomain = calculateYAxisDomain(minPrice, maxPrice);

  // Function to filter data based on the selected time interval
  const filterDataByTimeUnit = (timeUnit) => {
    if (!data.length) return data;

    const latestTimestamp = new Date(data[data.length - 1].timestamp);
    const filteredData = data.filter(item => {
      const itemTime = new Date(item.timestamp);
      const timeDiff = latestTimestamp - itemTime;
      switch (timeUnit) {
        case '5min':
          return timeDiff <= 5 * 60 * 1000;
        case '10min':
          return timeDiff <= 10 * 60 * 1000;
        case '30min':
          return timeDiff <= 30 * 60 * 1000;
        case '1h':
          return timeDiff <= 60 * 60 * 1000;
        case '24h':
          return timeDiff <= 24 * 60 * 60 * 1000;
        default:
          return true;
      }
    });
    return filteredData;
  };

  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(filterDataByTimeUnit(timeUnit));
  }, [timeUnit, data]);

  // Custom Tooltip Component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-3 rounded-lg shadow-lg">
          <p className="text-sm text-gray-300">{new Date(label).toLocaleString()}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: <span className="font-medium">${entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">Crypto Market Overview</h2>
        <TimeUnitFilter timeUnit={timeUnit} setTimeUnit={setTimeUnit} />
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#666" />
            <XAxis
              dataKey="timestamp"
              tick={{ fill: 'white' }}
              axisLine={{ stroke: '#888' }}
              tickLine={{ stroke: '#888' }}
              interval={filteredData.length > 10 ? 'preserveStart' : 0}
            />
            <YAxis
              domain={yAxisDomain}
              tick={{ fill: 'white' }}
              axisLine={{ stroke: '#888' }}
              tickLine={{ stroke: '#888' }}
            />
            <Tooltip content={<CustomTooltip />} />
            {coins.map((coin) => (
              <Line
                key={coin}
                type="monotone"
                dataKey={coin}
                stroke="#4CAF50"
                strokeWidth={2}
                dot={{ r: 4, stroke: '#4CAF50', strokeWidth: 2, fill: '#fff' }}
                activeDot={{ r: 6, stroke: '#4CAF50', strokeWidth: 3 }}
                isAnimationActive={true}
              />
            ))}
            <Legend
              wrapperStyle={{
                color: '#fff',
                paddingTop: 10,
                fontSize: 14,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CryptoChart;