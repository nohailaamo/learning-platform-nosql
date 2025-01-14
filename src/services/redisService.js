//⛔j'avais un probléme de connexion internet c'est pour ca j'ai pas fait les commits separées
//défintion des methodes des services du cache

// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse : En définissant une durée de vie (TTL) pour chaque clé, en invalidant les données obsolètes, et en évitant le sur-remplissage de Redis.

// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse : Utiliser des noms de clés explicites et hiérarchiques , et limiter la taille des données stockées.

const db = require('../config/db');

async function getCachedData(key) {
  try {
    const redisClient = db.getRedisClient();
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting cached data:', error);
    return null;
  }
}

async function cacheData(key, data, ttl = 3600) {
  try {
    const redisClient = db.getRedisClient();
    const jsonData = JSON.stringify(data);
    await redisClient.set(key, jsonData, 'EX', ttl);
  } catch (error) {
    console.error('Error caching data:', error);
  }
}

async function deleteCachedData(key) {
  try {
    const redisClient = db.getRedisClient();
    await redisClient.del(key);
  } catch (error) {
    console.error('Error deleting cached data:', error);
  }
}

async function clearCache() {
  try {
    const redisClient = db.getRedisClient();
    await redisClient.flushAll();
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
}

module.exports = {
  getCachedData,
  cacheData,
  deleteCachedData,
  clearCache,
};
