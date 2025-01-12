// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse : pour que les connexions aux bases de données permet de centraliser la logique de connexion, d'améliorer la réutilisation du code, et de simplifier la gestion des erreurs et de la maintenance.

// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse : Il faut écouter les signaux système comme SIGINT pour déclencher la fermeture propre des connexions avec les méthodes appropriées des clients . En cas d'erreur pendant la fermeture, il est important de capturer et de journaliser ces erreurs sans provoquer de crash.

const { MongoClient } = require('mongodb');
const redis = require('redis');
const config = require('./env');

let mongoClient, redisClient, db;

// Connexion à MongoDB
async function connectMongo() {
  try {
    mongoClient = new MongoClient(config.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await mongoClient.connect();
    db = mongoClient.db(config.mongoDbName);
    console.log('Connecté à MongoDB');
    return db;
  } catch (error) {
    console.error('Erreur de connexion à MongoDB :', error);
    process.exit(1); // Arrêt de l'application en cas d'erreur critique
  }
}

// Connexion à Redis
async function connectRedis() {
  try {
    redisClient = redis.createClient({ url: config.redisUri });
    redisClient.on('error', (err) => console.error('Erreur Redis :', err));
    await redisClient.connect();
    console.log('Connecté à Redis');
    return redisClient;
  } catch (error) {
    console.error('Erreur de connexion à Redis :', error);
    process.exit(1); // Arrêt de l'application en cas d'erreur critique
  }
}

// Fermeture des connexions
async function closeConnections() {
  try {
    if (mongoClient) {
      await mongoClient.close();
      console.log('Connexion MongoDB fermée');
    }
    if (redisClient) {
      await redisClient.quit();
      console.log('Connexion Redis fermée');
    }
  } catch (error) {
    console.error('Erreur lors de la fermeture des connexions :', error);
  }
}

// Écouter les signaux système pour une fermeture propre
process.on('SIGINT', async () => {
  console.log('Signal SIGINT reçu. Fermeture des connexions...');
  await closeConnections();
  process.exit(0);
});

// Export des fonctions et clients
module.exports = {
  connectMongo,
  connectRedis,
  closeConnections,
  getMongoDb: () => db,
  getRedisClient: () => redisClient,
};
