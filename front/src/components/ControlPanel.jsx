import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = "ws://localhost:4000";

const ControlPanel = () => {
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
    <div className="mb-6 bg-gradient-to-br from-white-50 via-white-100 to-white-200 shadow-xl rounded-2xl overflow-hidden border border-white-300">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <div
              className={`h-3 w-3 rounded-full ${
                isConnected ? "bg-green-500" : "bg-red-500"
              } animate-pulse`}
            ></div>
            <span
              className={`text-sm font-medium ${
                isConnected ? "text-green-600" : "text-red-600"
              }`}
            >
              {isConnected ? "🟢 Connected" : "🔴 Disconnected"}
            </span>
          </div>

          {/* Action Buttons - Removed for now */}
          {/* You can add new action buttons here in the future */}
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
