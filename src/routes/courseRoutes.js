//⛔j'avais un probléme de connexion internet c'est pour ca j'ai pas fait les commits separées

// Question: Pourquoi séparer les routes dans différents fichiers ?
// Réponse : Pour rendre le code plus modulaire, lisible et facile à maintenir.

// Question : Comment organiser les routes de manière cohérente ?
// Réponse: Les regrouper par fonctionnalités ou ressources (ex: utilisateurs, courses) dans des fichiers dédiés.

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Routes pour les cours
router.get('/', courseController.getAllCourses); // Récupérer tous les cours
router.post('/', courseController.createCourse); // Créer un nouveau cours
router.get('/stats', courseController.getCourseStats); // Obtenir les statistiques
router.get('/:id', courseController.getCourse); // Récupérer un cours par ID
router.put('/:id', courseController.updateCourse); // Mettre à jour un cours
router.delete('/:id', courseController.deleteCourse); // Supprimer un cours

module.exports = router;
