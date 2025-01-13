// Question: Pourquoi créer des services séparés ?
// Réponse: Pour centraliser la logique métier réutilisable et réduire la duplication de code.

const { ObjectId } = require('mongodb');

// Fonctions utilitaires pour MongoDB
async function findOneById(collection, id) {
  if (!ObjectId.isValid(id)) {
    throw new Error('Invalid ID format');
  }
  return await collection.findOne({ _id: new ObjectId(id) });
}

// Export des services
module.exports = {
  findOneById,
};
