//⛔j'avais un probléme de connexion internet c'est pour ca j'ai pas fait les commits separées

// Question: Comment organiser le point d'entrée de l'application ?
// Reponse : Crée un fichier principal (ex. main.js, main.py, etc.) qui sert de point central pour lancer l'application. Il doit rester simple et appeler des fonctions ou des modules bien structurés.

// Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?
// Reponse : Initialise les dépendances (configurations, base de données, services externes) dans un ordre logique, gère les erreurs au démarrage, et utilise des logs pour suivre le processus. Gardez le code lisible et modulaire.

const express = require('express');
const config = require('./config/env');
const db = require('./config/db');

const courseRoutes = require('./routes/courseRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

async function startServer() {
  try {
    // Connexion aux bases de données
    await db.connectMongo();
    await db.connectRedis();

    // Configurer le middleware JSON pour le parsing des requêtes
    app.use(express.json());

    // Ajouter une route pour la racine
    app.get('/', (req, res) => {
      res.send('Bienvenue à Learning Platform');
    });

    // Monter les routes pour les cours et les étudiants
    app.use('/courses', courseRoutes);
    app.use('/students', studentRoutes);

    // Démarrer le serveur sur le port configuré
    app.listen(config.port, () => {
      console.log(`Server is running on http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Gestion de l'arrêt propre du serveur
process.on('SIGINT', async () => {
  // Implémenter la fermeture des connexions aux bases de données
  await db.closeMongo();
  await db.closeRedis();
  console.log('Server is shutting down');
  process.exit(0);
});

// Lancer le serveur
startServer();
