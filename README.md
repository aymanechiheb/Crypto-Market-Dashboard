Crypto Market Dashboard

Ce projet est une API backend permettant de récupérer et de stocker les prix des cryptomonnaies en temps réel, ainsi que leurs métadonnées. L'application utilise Node.js avec Express, Sequelize pour la gestion de la base de données, et Socket.IO pour la diffusion en temps réel des prix.

📌 Fonctionnalités

Récupération des prix actuels des cryptomonnaies depuis l'API CoinGecko

Stockage des prix et des métadonnées dans une base de données PostgreSQL

Mise à jour automatique des prix et des métadonnées via des tâches CRON

Diffusion des prix en temps réel via WebSockets

API RESTful pour récupérer les données stockées

🛠️ Technologies utilisées

Node.js avec Express (serveur backend)

Sequelize (ORM pour PostgreSQL)

Socket.IO (WebSockets pour les mises à jour en temps réel)

Axios (Requêtes HTTP vers l'API CoinGecko)

node-cron (Planification des mises à jour)

PostgreSQL (Base de données)

dotenv (Gestion des variables d'environnement)
Installation et configuration

Cloner le projet
Installer les dépendances :
npm install
Configurer l'environnement Créer un fichier .env à la racine du projet et ajouter les variables suivantes :# Configuration de la base de données PostgreSQL
HOST=
USER=
PASSWORD=
DB=
DIALECT=
POOL_MAX=5
POOL_MIN=0
POOL_ACQUIRE=30000
POOL_IDLE=10000

# Port du serveur backend
PORT=3000
Démarrer le serveur : nodemon index.js
Endpoints API

1️⃣ Récupération des prix des cryptomonnaies

GET /api/crypto/prices → Récupère les prix actuels

GET /api/crypto/history/:cryptoId → Récupère l'historique des prix d'une cryptomonnaie

2️⃣ Récupération des métadonnées des cryptomonnaies

GET /api/crypto/metadata → Récupère les métadonnées de toutes les cryptomonnaies

GET /api/crypto/metadata/:id → Récupère les métadonnées d'une cryptomonnaie spécifique

🚀 WebSockets

L'application envoie les mises à jour des prix toutes les 5 secondes via l'événement cryptoUpdate.

Exemple d'écoute côté client : socket.on('cryptoUpdate', (data) => {
  console.log('Mise à jour des prix :', data);
});