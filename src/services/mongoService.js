//⛔j'avais un probléme de connexion internet c'est pour ca j'ai pas fait les commits separées
//défintion des methodes des services de base de données

// Question: Pourquoi créer des services séparés ?
// Réponse: Pour centraliser la logique métier réutilisable et réduire la duplication de code.

const { ObjectId } = require('mongodb');
const db = require('../config/db');

async function findMany(collectionName, query = {}) {
  const collection = db.getMongoDb().collection(collectionName);
  return await collection.find(query).toArray();
}

async function findOneById(collectionName, id) {
  if (!ObjectId.isValid(id)) {
    throw new Error('Invalid ID format');
  }
  const collection = db.getMongoDb().collection(collectionName);
  return await collection.findOne({ _id: new ObjectId(id) });
}

async function insertOne(collectionName, document) {
  const collection = db.getMongoDb().collection(collectionName);
  return await collection.insertOne(document);
}

async function updateOne(collectionName, id, update) {
  const collection = db.getMongoDb().collection(collectionName);
  const filter = { _id: new ObjectId(id) };
  const updateDoc = update.$push ? update : { $set: update };
  return await collection.updateOne(filter, updateDoc);
}

async function deleteOne(collectionName, id) {
  const collection = db.getMongoDb().collection(collectionName);
  return await collection.deleteOne({ _id: new ObjectId(id) });
}

async function aggregate(collectionName, pipeline) {
  const collection = db.getMongoDb().collection(collectionName);
  return await collection.aggregate(pipeline).toArray();
}

module.exports = {
  findMany,
  findOneById,
  insertOne,
  updateOne,
  deleteOne,
  aggregate,
};
