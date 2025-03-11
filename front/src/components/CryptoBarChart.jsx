import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const CryptoBarChart = ({ data }) => {
  if (!data || data.length === 0) return <p className="text-gray-500">No data available</p>;

  // Reformater les données en regroupant les cryptos sous un même timestamp
  const formattedData = data.reduce((acc, entry) => {
    let existing = acc.find((d) => d.timestamp === "Prices");
    if (!existing) {
      existing = { timestamp: "Prices" };
      acc.push(existing);
    }
    existing[entry.name] = parseFloat(entry.price);
    return acc;
  }, []);

  console.log("Formatted Data:", formattedData);

  const coins = Object.keys(formattedData[0]).filter((key) => key !== "timestamp");

  // 🎨 Palette de couleurs dynamique
  const colors = ["#FF5733", "#FF8C00", "#FFD700", "#32CD32", "#3380FF", "#FF33A8", "#8A2BE2", "#00CED1", "#DC143C"];

  // 🎨 Tooltip personnalisé
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload?.length) {
      return (
        <div className="bg-gray-900 p-3 rounded-lg shadow-lg">
          {payload.map((entry, index) => (
            <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
              {entry.name}: <span className="font-bold">${entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Crypto Market Prices</h2>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={formattedData} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
            <XAxis dataKey="timestamp" tick={{ fill: "black" }} />
            <YAxis tick={{ fill: "black" }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {coins.map((coin, index) => (
              <Bar
                key={coin}
                dataKey={coin}
                fill={colors[index % colors.length]} // 🔥 Couleur unique pour chaque barre
                radius={[8, 8, 0, 0]}
                animationDuration={800}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CryptoBarChart;