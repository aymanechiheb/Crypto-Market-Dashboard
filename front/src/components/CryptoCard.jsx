import React, { useEffect, useState } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'; // Font Awesome icons

const CryptoCard = ({ name, price, symbol }) => {
  const [previousPrice, setPreviousPrice] = useState(price);
  const [priceChange, setPriceChange] = useState(null);

  useEffect(() => {
    // Compare current price with previous price to determine price movement
    if (price > previousPrice) {
      setPriceChange('increase');
    } else if (price < previousPrice) {
      setPriceChange('decrease');
    } else {
      setPriceChange(null); // No change
    }

    setPreviousPrice(price); // Update previous price
  }, [price]);

  return (
    <div className={`col-span-1 rounded-2xl shadow-lg p-6 text-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
      priceChange === 'increase' ? 'border-4 border-green-500' :
      priceChange === 'decrease' ? 'border-4 border-red-500' : ''
    } bg-white`}>
      <div className="relative h-full">
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 to-transparent blur-md"></div>

        <div className="relative flex flex-col justify-between h-full">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">{name} ({symbol.toUpperCase()})</h3>
          </div>

          {/* Price and Change */}
          <div className="flex justify-between items-center">
            <p className="text-3xl font-extrabold">${price}</p>
            <div className="flex items-center space-x-2">
              {priceChange === 'increase' && (
                <div className="flex justify-center items-center w-10 h-10 bg-green-500 text-white rounded-full">
                  <FaArrowUp className="text-2xl" />
                </div>
              )}
              {priceChange === 'decrease' && (
                <div className="flex justify-center items-center w-10 h-10 bg-red-500 text-white rounded-full">
                  <FaArrowDown className="text-2xl" />
                </div>
              )}
              {priceChange === null && (
                <div className="flex justify-center items-center w-10 h-10 bg-gray-300 text-white rounded-full">
                  <span>–</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoCard;
