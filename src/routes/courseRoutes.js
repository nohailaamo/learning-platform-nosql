// Question: Pourquoi séparer les routes dans différents fichiers ?
// Réponse : Pour rendre le code plus modulaire, lisible et facile à maintenir.

// Question : Comment organiser les routes de manière cohérente ?
// Réponse: Les regrouper par fonctionnalités ou ressources (ex: utilisateurs, courses) dans des fichiers dédiés.

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Routes pour les cours
router.post('/', courseController.createCourse); // Ajouter un cours
router.get('/:id', courseController.getCourse); // Récupérer un cours par ID
router.get('/stats', courseController.getCourseStats); // Obtenir des statistiques sur les cours

module.exports = router;
