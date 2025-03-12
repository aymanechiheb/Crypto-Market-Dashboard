import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
export const socket = io(SOCKET_URL, { transports: ['websocket'] });

// Listen for the 'connect' event
socket.on('connect', () => {
  console.log('WebSocket connected');
});

// Listen for the 'disconnect' event
socket.on('disconnect', () => {
  console.log('WebSocket disconnected');
});

// Optionally, you can also listen for the 'connect_error' event to handle connection errors
socket.on('connect_error', (error) => {
  console.error('WebSocket connection error:', error);
});