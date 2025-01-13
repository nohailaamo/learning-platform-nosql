// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse: Une route est responsable de mapper une URL à une fonction spécifique, tandis qu'un contrôleur contient la logique métier qui traite les données et gère les actions associées.

// Question : Pourquoi séparer la logique métier des routes ?
// Réponse : Pour améliorer la maintenabilité, la réutilisation et la lisibilité du code.

const { ObjectId } = require('mongodb');
const mongoService = require('../services/mongoService');

// Création d'un cours
async function createCourse(req, res) {
  try {
    const { title, description, instructor } = req.body;

    if (!title || !description || !instructor) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

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
async function getCourse(req, res) {
  try {
    const courseId = req.params.id;

    if (!ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: 'ID invalide.' });
    }

    const course = await mongoService.findDocumentById('courses', courseId);

    if (!course) {
      return res.status(404).json({ message: "Le cours n'existe pas." });
    }

    return res.status(200).json(course);
  } catch (error) {
    console.error('Erreur lors de la récupération du cours :', error);
    return res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
}

// Obtenir des statistiques sur les cours
async function getCourseStats(req, res) {
  try {
    const totalCourses = await mongoService.countDocuments('courses');

    const stats = {
      totalCourses,
    };

    return res.status(200).json(stats);
  } catch (error) {
    console.error(
      'Erreur lors de la récupération des statistiques des cours :',
      error
    );
    return res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
}

module.exports = {
  createCourse,
  getCourse,
  getCourseStats,
};
