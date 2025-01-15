# Projet de Plateforme d'Apprentissage NoSQL

## 📋 Description du Projet

Ce projet est une implémentation d'une API backend pour une plateforme d'apprentissage en ligne, réalisé dans le cadre du module NoSQL. L'API permet la gestion des cours et des étudiants avec une architecture moderne utilisant MongoDB et Redis.

## 🎯 Objectifs du Projet

- Implémenter une API RESTful avec Node.js
- Utiliser MongoDB comme base de données principale
- Implémenter un système de cache avec Redis
- Suivre les bonnes pratiques de développement
- Gérer proprement les configurations et les connexions aux bases de données

## 🚀 Installation et Configuration

### 1. Clonage du Projet

```bash
# Cloner le dépôt template
git clone https://github.com/pr-daaif/learning-platform-template

# Se placer dans le répertoire
cd learning-platform-template

# Reconfigurer le dépôt distant
git remote remove origin
git remote add origin https://github.com/[votre-compte]/learning-platform-nosql
git push -u origin main
```

### 2. Installation des Dépendances

```bash
# Installation des packages nécessaires
npm install
```

### 3. Configuration de l'Environnement

Créer un fichier `.env` à la racine du projet :

```env
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB_NAME=learning_platform
REDIS_URI=redis://localhost:6379
PORT=3000
```

### 4. Démarrage des Services

```bash
# MongoDB
# Windows
net start MongoDB


# Redis
# Windows
redis-server

```

### 5. Lancement de l'Application

```bash
npm start
```

## 📁 Structure du Projet

```
learning-platform/
├── src/
│   ├── app.js                 # Point d'entrée de l'application
│   ├── test.js                 # Test d'insertion
│   ├── config/
│   │   ├── env.js            # Configuration des variables d'environnement
│   │   └── db.js             # Configuration des bases de données
│   ├── controllers/
│   │   ├── courseController.js    # Logique des cours
│   │   └── studentController.js   # Logique des étudiants
│   ├── routes/
│   │   ├── courseRoutes.js       # Routes pour les cours
│   │   └── studentRoutes.js      # Routes pour les étudiants
│   └── services/
│       ├── mongoService.js       # Services MongoDB
│       └── redisService.js       # Services Redis
|   |___screenshotsDataBase       # Screen de reussite de chaque etapes
├── .env                      # Variables d'environnement
└── package.json             # Dépendances et scripts
```

### 1. Organisation du Point d'Entrée (app.js)

- Séparation claire des configurations et des connexions
- Gestion des erreurs centralisée
- Initialisation structurée des middlewares et des routes

### 2. Gestion des Connexions aux Bases de Données (db.js)

- Module séparé pour une meilleure maintenabilité
- Gestion propre des connexions et déconnexions
- Réutilisation simplifiée des instances de connexion

### 3. Séparation Routes/Contrôleurs

- Les routes définissent uniquement les endpoints
- Les contrôleurs contiennent la logique métier
- Meilleure maintenabilité et testabilité

### 4. Gestion du Cache Redis

- Mise en cache des données fréquemment accédées
- Invalidation automatique lors des modifications
- Amélioration des performances

## 💭 Choix Techniques

1. **Node.js et Express**

   - Framework mature et bien documenté
   - Grande communauté et nombreux packages disponibles
   - Excellent pour les API REST

2. **MongoDB**

   - Flexibilité du schéma pour les données éducatives
   - Excellentes performances en lecture
   - Facilité de mise à l'échelle

3. **Redis**
   - Cache performant pour les données fréquemment accédées
   - Réduction de la charge sur MongoDB
   - Support des structures de données complexes

## 💭 Les reponse des questions

## db.js

Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
Réponse : pour que les connexions aux bases de données permet de centraliser la logique de connexion, d'améliorer la réutilisation du code, et de simplifier la gestion des erreurs et de la maintenance.

Question : Comment gérer proprement la fermeture des connexions ?
Réponse : Il faut écouter les signaux système comme SIGINT pour déclencher la fermeture propre des connexions avec les méthodes appropriées des clients . En cas d'erreur pendant la fermeture, il est important de capturer et de journaliser ces erreurs sans provoquer de crash.

## env.js

Question: Pourquoi est-il important de valider les variables d'environnement au démarrage ?
Réponse : Il est essentiel de valider les champs indispensables au bon fonctionnement du serveur sans erreur.

Question: Que se passe-t-il si une variable requise est manquante ?
Réponse : J'ai uniquement modifié la validation en utilisant un bloc try-catch pour gérer l'erreur et arrêter l'application.

## courseController

Question: Quelle est la différence entre un contrôleur et une route ?
Réponse: Une route est responsable de mapper une URL à une fonction spécifique, tandis qu'un contrôleur contient la logique métier qui traite les données et gère les actions associées.

Question : Pourquoi séparer la logique métier des routes ?
Réponse : Pour améliorer la maintenabilité, la réutilisation et la lisibilité du code.

## courseRoutes

Question: Pourquoi séparer les routes dans différents fichiers ?
Réponse : Pour rendre le code plus modulaire, lisible et facile à maintenir.

Question : Comment organiser les routes de manière cohérente ?
Réponse: Les regrouper par fonctionnalités ou ressources (ex: utilisateurs, courses) dans des fichiers dédiés.

## mongoService

Question: Pourquoi créer des services séparés ?
Réponse: Pour centraliser la logique métier réutilisable et réduire la duplication de code.

## redisService

Question : Comment gérer efficacement le cache avec Redis ?
Réponse : En définissant une durée de vie (TTL) pour chaque clé, en invalidant les données obsolètes, et en évitant le sur-remplissage de Redis.

Question: Quelles sont les bonnes pratiques pour les clés Redis ?
Réponse : Utiliser des noms de clés explicites et hiérarchiques , et limiter la taille des données stockées.

## app.js

Question: Comment organiser le point d'entrée de l'application ?
Reponse : Crée un fichier principal (ex. main.js, main.py, etc.) qui sert de point central pour lancer l'application. Il doit rester simple et appeler des fonctions ou des modules bien structurés.

Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?
Reponse : Initialise les dépendances (configurations, base de données, services externes) dans un ordre logique, gère les erreurs au démarrage, et utilise des logs pour suivre le processus. Gardez le code lisible et modulaire.

## .env

Question: Quelles sont les informations sensibles à ne jamais commiter ?
Réponse : Mots de passe + Clés API + Tokens d'accès + Informations personnelles + Variables d'environnement contenant des données sensibles
Question: Pourquoi utiliser des variables d'environnement ?
Réponse : Sécuriser les informations sensibles + Faciliter la configuration sans modifier le code

## 📚 API Endpoints

### Courses

```bash
GET    /courses          # Liste tous les cours
POST   /courses          # Crée un nouveau cours
GET    /courses/:id      # Récupère un cours
PUT    /courses/:id      # Met à jour un cours
DELETE /courses/:id      # Supprime un cours
GET    /courses/stats    # Statistiques des cours
```

### Students

```bash
GET    /students         # Liste tous les étudiants
POST   /students         # Crée un nouvel étudiant
GET    /students/:id     # Récupère un étudiant
PUT    /students/:id     # Met à jour un étudiant
DELETE /students/:id     # Supprime un étudiant
POST   /students/:id/enroll  # Inscrit à un cours
GET    /students/:id/courses # Liste les cours d'un étudiant
```

## 👤 Auteur

AMOUHAL Nouhayla
