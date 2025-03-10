import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = "ws://localhost:3000";

const Sidebar = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = io(SOCKET_URL, { transports: ["websocket"] });

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="bg-gray-900 w-64 min-h-screen p-4 text-white">
      <div className="mt-4 p-2 text-sm text-center rounded-lg" 
           style={{ backgroundColor: isConnected ? 'green' : 'red' }}>
        {isConnected ? "🟢 Connecté" : "🔴 Déconnecté"}
      </div>
    </div>
  );
};

export default Sidebar;
