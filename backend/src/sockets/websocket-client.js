const io = require('socket.io-client');

// Se connecter au serveur WebSocket
const socket = io('http://localhost:3000');

// Écouter les mises à jour en temps réel
socket.on('connect', () => {
  console.log('Connecté au serveur WebSocket');
});

socket.on('cryptoUpdate', (data) => {
  console.log('Mise à jour reçue :');
});

// Gérer les erreurs de connexion
socket.on('connect_error', (error) => {
  console.error('Erreur de connexion :', error);
});