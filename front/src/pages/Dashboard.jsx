/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import useCryptoData from "../hooks/useCryptoData";
import useWebSocket from "../hooks/useWebSocket";
import CryptoCard from "../components/CryptoCard";
import CryptoChart from "../components/CryptoChart";
import CryptoBarChart from "../components/CryptoBarChart";
import HistoryPrice from "../components/HistoryPrice";
import { motion } from "framer-motion"; // 🔄 Animations

const Dashboard = () => {
  const { prices, metadata, isLoading, error } = useCryptoData();
  const { cryptoData, isSocketLoading } = useWebSocket();
  const [chartData, setChartData] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // 📊 Mise en forme des données pour les graphiques
  useEffect(() => {
    if (cryptoData) {
      const formattedData = Object.entries(cryptoData).map(([cryptoId, value]) => ({
        name: cryptoId,
        price: parseFloat(value.usd),
      }));
      setChartData(formattedData);
    }
  }, [cryptoData]);

  // 🌙 Gestion du mode sombre/clair avec stockage local
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // 🔍 Filtrage des cryptos selon la recherche
  const filteredCryptos = Array.isArray(metadata)
    ? metadata.filter((crypto) => crypto.name.toLowerCase().includes(search))
    : [];

  // 🕓 Loader centralisé
  if (isLoading || isSocketLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <span className="text-lg font-semibold">🔄 Loading data...</span>
      </div>
    );
  }

  // ❌ Gestion des erreurs
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <span>❌ Error loading data. Please try again later.</span>
      </div>
    );
  }

  return (
    <div className={`${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen p-6`}>
      {/* ✅ Bouton Dark Mode */}
      <div className="flex justify-end mb-4">
        
      </div>

      {/* ✅ Barre de recherche */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search Cryptocurrency..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
      </div>

      {/* ✅ Section CryptoCards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCryptos.length > 0 ? (
          filteredCryptos.map((crypto, index) => (
            <motion.div
              key={crypto.cryptoId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <CryptoCard
                name={crypto.name}
                price={cryptoData?.[crypto.cryptoId]?.usd || prices[crypto.cryptoId]?.usd}
                symbol={crypto.symbol}
                onClick={() => setSelectedCrypto(crypto.cryptoId)}
              />
            </motion.div>
          ))
        ) : (
          <div className="text-center col-span-full text-gray-500">No cryptocurrency data available</div>
        )}
      </div>

      {/* ✅ Section Graphiques */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart 📊 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <CryptoBarChart data={chartData} />
        </motion.div>

        {/* Line Chart 📈 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {chartData.length > 0 ? (
            <CryptoChart data={chartData} />
          ) : (
            <div className="text-center text-gray-500">No chart data available</div>
          )}
        </motion.div>
      </div>

      {/* ✅ HistoryPrice Modal */}
      {selectedCrypto && <HistoryPrice cryptoId={selectedCrypto} onClose={() => setSelectedCrypto(null)} />}
    </div>
  );
};

export default Dashboard;
