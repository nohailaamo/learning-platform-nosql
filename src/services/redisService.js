// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse : En définissant une durée de vie (TTL) pour chaque clé, en invalidant les données obsolètes, et en évitant le sur-remplissage de Redis.

// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse : Utiliser des noms de clés explicites et hiérarchiques , et limiter la taille des données stockées.

// Fonctions utilitaires pour Redis
async function cacheData(key, data, ttl) {
  try {
    const jsonData = JSON.stringify(data);
    await redisClient.set(key, jsonData, 'EX', ttl); // Définit un TTL (en secondes)
  } catch (error) {
    console.error('Error caching data:', error);
  }
}

module.exports = {
  cacheData,
};
