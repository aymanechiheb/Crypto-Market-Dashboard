import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "ws://localhost:4000";

export function useWebSocket() {
    const [cryptoData, setCryptoData] = useState(null);

    useEffect(() => {
        const socket = io(SOCKET_URL, { transports: ["websocket"] });

        socket.on("cryptoUpdate", (data) => {  // <-- Change ici
            setCryptoData(data);
            console.log("websocketdata",data);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return { cryptoData };
}

export default useWebSocket;
