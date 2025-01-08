// Question: Pourquoi est-il important de valider les variables d'environnement au démarrage ?
// Réponse : Il est essentiel de valider les champs indispensables au bon fonctionnement du serveur sans erreur.
// Question: Que se passe-t-il si une variable requise est manquante ?
// Réponse : J'ai uniquement modifié la validation en utilisant un bloc try-catch pour gérer l'erreur et arrêter l'application.

const dotenv = require('dotenv');
dotenv.config();

const requiredEnvVars = ['MONGODB_URI', 'MONGODB_DB_NAME', 'REDIS_URI'];

// Validation des variables d'environnement
function validateEnv() {
  // TODO: Implémenter la validation
  const dontExist = requiredEnvVars.filter((value) => !process.env[value]);
  if (dontExist.length > 0) {
    throw new Error(`Missing environment variables: ${dontExist.join(', ')}`);
  }
  // Si une variable manque, lever une erreur explicative
}
try {
  validateEnv();
  console.log('all env variables are valid');
} catch (e) {
  console.error('Failed to validate environment variables:', e.message);
  process.exit(1);
}

module.exports = {
  mongodb: {
    uri: process.env.MONGODB_URI,
    dbName: process.env.MONGODB_DB_NAME,
  },
  redis: {
    uri: process.env.REDIS_URI,
  },
  port: process.env.PORT || 3000,
};
