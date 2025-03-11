/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { motion } from 'framer-motion';

const HistoryPrice = ({ cryptoId, onClose }) => {
  const [priceHistory, setPriceHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/crypto/history/${cryptoId}`);
        setPriceHistory(response.data);
        console.log(response);
        console.log(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'historique des prix:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [cryptoId]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50"
    >
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-3xl">
        <button onClick={onClose} className="absolute top-4 right-6 text-gray-500 hover:text-gray-800 text-xl">✖</button>
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">{cryptoId} Price History</h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={priceHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis dataKey="timestamp" tickFormatter={(time) => new Date(time).toLocaleDateString()} tick={{ fill: 'black' }} />
              <YAxis tick={{ fill: 'black' }} />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#4CAF50" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
};

export default HistoryPrice;
