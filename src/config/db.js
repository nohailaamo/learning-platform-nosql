//⛔j'avais un probléme de connexion internet c'est pour ca j'ai pas fait les commits separées

// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse : pour que les connexions aux bases de données permet de centraliser la logique de connexion, d'améliorer la réutilisation du code, et de simplifier la gestion des erreurs et de la maintenance.

// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse : Il faut écouter les signaux système comme SIGINT pour déclencher la fermeture propre des connexions avec les méthodes appropriées des clients . En cas d'erreur pendant la fermeture, il est important de capturer et de journaliser ces erreurs sans provoquer de crash.

const { MongoClient } = require('mongodb');
const redis = require('redis');
const config = require('./env');

let mongoClient, redisClient, db;

async function connectMongo() {
  try {
    mongoClient = new MongoClient(config.mongoUri);
    await mongoClient.connect();
    db = mongoClient.db(config.mongoDbName);
    console.log('Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

async function connectRedis() {
  try {
    redisClient = redis.createClient({
      url: config.redisUri,
    });

    redisClient.on('error', (err) => console.error('Redis Client Error:', err));
    await redisClient.connect();
    console.log('Connected to Redis');
    return redisClient;
  } catch (error) {
    console.error('Redis connection error:', error);
    throw error;
  }
}

async function closeMongo() {
  try {
    if (mongoClient) {
      await mongoClient.close();
      console.log('MongoDB connection closed');
    }
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
}

async function closeRedis() {
  try {
    if (redisClient) {
      await redisClient.quit();
      console.log('Redis connection closed');
    }
  } catch (error) {
    console.error('Error closing Redis connection:', error);
  }
}

module.exports = {
  connectMongo,
  connectRedis,
  closeMongo,
  closeRedis,
  getMongoDb: () => db,
  getRedisClient: () => redisClient,
};
