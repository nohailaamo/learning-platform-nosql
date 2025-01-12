// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse: Une route est responsable de mapper une URL à une fonction spécifique, tandis qu'un contrôleur contient la logique métier qui traite les données et gère les actions associées.
// Question : Pourquoi séparer la logique métier des routes ?
// Réponse : Pour améliore la maintenabilité, la réutilisation et la lisibilité du code.

const { ObjectId } = require('mongodb');
const db = require('../config/db');
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

// Création d'un cours
async function createCourse(req, res) {
  try {
    const { title, description, instructor } = req.body;

    if (!title || !description || !instructor) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    // Utilisation du service MongoDB pour insérer un cours
    const course = {
      title,
      description,
      instructor,
      createdAt: new Date(),
    };

    const result = await mongoService.insertDocument('courses', course);
    return res.status(201).json({
      message: 'Cours créé avec succès.',
      courseId: result.insertedId,
    });
  } catch (error) {
    console.error('Erreur lors de la création du cours :', error);
    return res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
}

// Récupération d'un cours par son ID
async function getCourseById(req, res) {
  try {
    const courseId = req.params.id;

    if (!ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: 'ID invalide.' });
    }

    const course = await mongoService.findDocumentById('courses', courseId);

    if (!course) {
      return res.status(404).json({ message: 'Cours existe pas.' });
    }

    return res.status(200).json(course);
  } catch (error) {
    console.error('Erreur lors de la récupération du cours :', error);
    return res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
}

// Mise à jour d'un cours
async function updateCourse(req, res) {
  try {
    const courseId = req.params.id;
    const updates = req.body;

    if (!ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: 'ID invalide.' });
    }

    const result = await mongoService.updateDocumentById(
      'courses',
      courseId,
      updates
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Cours existe pas.' });
    }

    return res.status(200).json({ message: 'Cours mis à jour avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du cours :', error);
    return res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
}

// Suppression d'un cours
async function deleteCourse(req, res) {
  try {
    const courseId = req.params.id;

    if (!ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: 'ID invalide.' });
    }

    const result = await mongoService.deleteDocumentById('courses', courseId);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Cours existe pas.' });
    }

    return res.status(200).json({ message: 'Cours supprimé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression du cours :', error);
    return res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
}

// Export des contrôleurs
module.exports = {
  createCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
};
