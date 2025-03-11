/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend,   
} from 'recharts';
import TimeUnitFilter from './TimeUnitFilter';

const CryptoChart = ({ data, timeUnit, setTimeUnit, isLoading }) => {
  const coins = Object.keys(data[0] || {}).filter((key) => key !== 'timestamp');

  const allPrices = data.flatMap(item => coins.map(coin => item[coin]));
  const maxPrice = Math.max(...allPrices);
  const minPrice = Math.min(...allPrices);

  const calculateYAxisDomain = (min, max) => {
    const range = max - min;
    const padding = range * 0.1;
    return [Math.floor(min - padding), Math.ceil(max + padding)];
  };

  const yAxisDomain = calculateYAxisDomain(minPrice, maxPrice);

  const filterDataByTimeUnit = (timeUnit) => {
    if (!data.length) return data;
    const latestTimestamp = new Date(data[data.length - 1].timestamp);
    return data.filter(item => {
      const itemTime = new Date(item.timestamp);
      const timeDiff = latestTimestamp - itemTime;
      switch (timeUnit) {
        case '5min': return timeDiff <= 5 * 60 * 1000;
        case '10min': return timeDiff <= 10 * 60 * 1000;
        case '30min': return timeDiff <= 30 * 60 * 1000;
        case '1h': return timeDiff <= 60 * 60 * 1000;
        case '24h': return timeDiff <= 24 * 60 * 60 * 1000;
        default: return true;
      }
    });
  };

  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(filterDataByTimeUnit(timeUnit));
  }, [timeUnit, data]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
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
          <AreaChart data={filteredData}>
            <defs>
              {coins.map((coin, index) => (
                <linearGradient key={coin} id={`color${index}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4CAF50" stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="timestamp" tick={{ fill: 'black' }} />
            <YAxis domain={yAxisDomain} tick={{ fill: 'black' }} />
            <Tooltip content={<CustomTooltip />} />
            {coins.map((coin, index) => (
              <Area
                key={coin}
                type="monotone"
                dataKey={coin}
                stroke="#4CAF50"
                strokeWidth={2}
                fill={`url(#color${index})`}
                dot={{ r: 4, stroke: '#4CAF50', strokeWidth: 2, fill: '#fff' }}
                activeDot={{ r: 6, stroke: '#4CAF50', strokeWidth: 3 }}
              />
            ))}
            <Legend />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CryptoChart;
