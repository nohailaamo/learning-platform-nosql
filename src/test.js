// test.js est un fichier de test de notre programme
const axios = require('axios');

async function testAPI() {
  try {
    // Créer un cours
    const course = await axios.post('http://localhost:3000/courses', {
      title: 'Test Course',
      description: 'Test Description',
      instructor: 'Test Instructor',
      duration: 6,
      level: 'Beginner',
    });
    console.log('Course created:', course.data);

    // Créer un étudiant
    const student = await axios.post('http://localhost:3000/students', {
      firstName: 'Test',
      lastName: 'Student',
      email: 'test@example.com',
    });
    console.log('Student created:', student.data);

    // Inscrire l'étudiant au cours
    const enrollment = await axios.post(
      `http://localhost:3000/students/${student.data._id}/enroll`,
      {
        courseId: course.data._id,
      }
    );
    console.log('Enrollment successful:', enrollment.data);
  } catch (error) {
    console.error('Test failed:', error.response?.data || error.message);
  }
}

testAPI();
