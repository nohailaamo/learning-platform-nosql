//⛔j'avais un probléme de connexion internet c'est pour ca j'ai pas fait les commits separées
//routage pour infos des students
const express = require('express');
const router = express.Router();

const studentController = require('../controllers/studentController');

// Routes pour les étudiants
router.get('/', studentController.getAllStudents);
router.post('/', studentController.createStudent);
router.get('/:id', studentController.getStudent);
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);
router.post('/:id/enroll', studentController.enrollCourse);
router.get('/:id/courses', studentController.getStudentEnrolledCourses);

module.exports = router;
