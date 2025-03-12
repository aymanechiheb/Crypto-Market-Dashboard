const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Nécessaire pour Render
    },
  },
  logging: false, // Désactive les logs SQL dans la console
});

sequelize.authenticate()
  .then(() => console.log('✅ Connexion réussie à PostgreSQL'))
  .catch(err => console.error('❌ Erreur de connexion :', err));

module.exports = sequelize;
