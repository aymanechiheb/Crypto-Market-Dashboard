# Crypto Market Dashboard

Ce projet est une application complète permettant de récupérer, stocker et afficher en temps réel les prix des cryptomonnaies. Il comprend un backend en Node.js avec Express et un frontend en React.

## 📌 Fonctionnalités

### Backend :
- Récupération des prix actuels des cryptomonnaies depuis l'API CoinGecko
- Stockage des prix et des métadonnées dans une base de données PostgreSQL
- Mise à jour automatique des prix et des métadonnées via des tâches CRON
- Diffusion des prix en temps réel via WebSockets
- API RESTful pour récupérer les données stockées

### Frontend :
- Affichage des prix des cryptomonnaies en temps réel
- Graphiques dynamiques avec Recharts (barres et lignes)
- Mode clair/sombre
- Recherche de cryptomonnaies
- Affichage de l'historique des prix
- Connexion en temps réel au backend via WebSockets

## 🛠️ Technologies utilisées

### Backend :
- Node.js avec Express (serveur backend)
- Sequelize (ORM pour PostgreSQL)
- Socket.IO (WebSockets pour les mises à jour en temps réel)
- Axios (Requêtes HTTP vers l'API CoinGecko)
- node-cron (Planification des mises à jour)
- PostgreSQL (Base de données)
- dotenv (Gestion des variables d'environnement)

### Frontend :
- React (Framework frontend)
- Tailwind CSS (Stylisation)
- Recharts (Graphiques)
- Axios (Requêtes API)
- React Toastify (Notifications)
- WebSockets (Mises à jour en temps réel)

## 🚀 Installation et configuration

### 1️⃣ Cloner le projet
```bash
git clone 
cd crypto-market-dashboard
```

### 2️⃣ Installer les dépendances
#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

### 3️⃣ Configurer l'environnement
Créer un fichier `.env` à la racine du backend et y ajouter les variables suivantes :

```env
# Configuration de la base de données PostgreSQL
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
```

Créer un fichier `.env` à la racine du frontend et y ajouter :
```env
REACT_APP_API_BASE_URL=http://localhost:3000/api
```

### 4️⃣ Démarrer l'application
#### Lancer le backend
```bash
cd backend
nodemon index.js
```

#### Lancer le frontend
```bash
cd frontend
npm start
```

## 📡 Endpoints API

### 1️⃣ Récupération des prix des cryptomonnaies
- `GET /api/crypto/prices` → Récupère les prix actuels
- `GET /api/crypto/history/:cryptoId` → Récupère l'historique des prix d'une cryptomonnaie

### 2️⃣ Récupération des métadonnées des cryptomonnaies
- `GET /api/crypto/metadata` → Récupère les métadonnées de toutes les cryptomonnaies
- `GET /api/crypto/metadata/:id` → Récupère les métadonnées d'une cryptomonnaie spécifique

## 🔄 WebSockets
L'application envoie les mises à jour des prix toutes les 5 secondes via l'événement `cryptoUpdate`.

Exemple d'écoute côté client :
```js
socket.on('cryptoUpdate', (data) => {
  console.log('Mise à jour des prix :', data);
});
```



✨ Projet développé avec ❤️ par [aymane chieb] ✨

