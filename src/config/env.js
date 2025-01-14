//⛔j'avais un probléme de connexion internet c'est pour ca j'ai pas fait les commits separées

// Question: Pourquoi est-il important de valider les variables d'environnement au démarrage ?
// Réponse : Il est essentiel de valider les champs indispensables au bon fonctionnement du serveur sans erreur.
// Question: Que se passe-t-il si une variable requise est manquante ?
// Réponse : J'ai uniquement modifié la validation en utilisant un bloc try-catch pour gérer l'erreur et arrêter l'application.

const dotenv = require('dotenv');
dotenv.config();

const requiredEnvVars = ['MONGODB_URI', 'MONGODB_DB_NAME', 'REDIS_URI'];

function validateEnv() {
  const missingVars = requiredEnvVars.filter((key) => !process.env[key]);
  if (missingVars.length > 0) {
    throw new Error(`Missing environment variables: ${missingVars.join(', ')}`);
  }
}

try {
  validateEnv();
  console.log('All environment variables are valid');
} catch (e) {
  console.error('Failed to validate environment variables:', e.message);
  process.exit(1);
}

module.exports = {
  mongoUri: process.env.MONGODB_URI,
  mongoDbName: process.env.MONGODB_DB_NAME,
  redisUri: process.env.REDIS_URI,
  port: process.env.PORT || 3000,
};
