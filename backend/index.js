const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./src/Config/db');
const routes = require('./src/routes/routes');
const { startCronJobs } = require('./src/cronJobs');
const { sendCryptoUpdates } = require('./src/services/socketService');

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*', methods: ['GET', 'POST'] }));
app.use('/api', routes);

sequelize.sync()
  .then(() => console.log('Base de données connectée'))
  .catch((err) => console.error('Erreur de connexion à la base de données :', err));

startCronJobs();

const io = new Server(server, { cors: { origin: process.env.ALLOWED_ORIGIN || '*', methods: ['GET', 'POST'] } });
io.on('connection', (socket) => {
  console.log('Utilisateur connecté');
  sendCryptoUpdates(socket);
  socket.on('disconnect', () => console.log('Utilisateur déconnecté'));
});

process.on('unhandledRejection', (err) => { 
  console.error('Erreur non gérée :', err); 
  process.exit(0); 
});

process.on('uncaughtException', (err) => { 
  console.error('Exception non capturée :', err); 
  process.exit(0); 
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => console.log(`Serveur backend en écoute sur le port ${PORT}`));