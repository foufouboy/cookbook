# cookbook

# Projet Fullstack – Application de gestion de recettes

## 🔧 Contexte  
Vous allez développer une application complète **frontend + backend** permettant à des utilisateurs de **gérer des recettes de cuisine** (affichage, ajout, modification, suppression), avec une **authentification sécurisée**.

L’objectif est de concevoir une architecture propre, moderne et fonctionnelle en utilisant **React pour le frontend** et **Node.js + Express + MongoDB pour le backend**.

---

## 📌 Objectifs principaux

- Concevoir une API REST sécurisée pour la gestion des utilisateurs et des recettes.
- Mettre en place une application React avec une interface utilisateur fluide.
- Gérer l’authentification via `JWT` et le `localStorage`.
- Protéger les routes sensibles côté frontend et backend.

---

## ✅ Travail demandé

### 🔒 1. Authentification
- Créez un modèle `User` (MongoDB) avec mot de passe hashé (bcrypt).
- Mettez en place une route `POST /auth/login` qui renvoie un token JWT.
- Stockez ce token dans le frontend et utilisez un `context` React pour l'utilisateur connecté.
- Protégez certaines routes (comme l’espace admin) via middleware backend **et** via des routes privées côté React.

---

### 🍽️ 2. Gestion des recettes
- Créez un modèle `Recipe` contenant : titre, description, image, auteur, date.
- Côté public : afficher toutes les recettes.
- Côté privé (admin) :
  - Ajouter une recette avec image upload.
  - Modifier une recette existante.
  - Supprimer une recette (avec confirmation).

---

### 🛠️ 3. Architecture et bonnes pratiques
- **Backend** :
  - Structure claire : `routes/`, `controllers/`, `models/`, `middlewares/`.
  - Middleware d'authentification JWT.
  - Validation des données (via `express-validator` ou équivalent).
  - Erreurs bien gérées (codes HTTP, messages clairs).

- **Frontend** :
  - Utilisation de `React Router` pour la navigation.
  - Contexte global pour l’utilisateur connecté.
  - Gestion des formulaires (création / édition) avec feedback utilisateur.
  - Composants réutilisables et dossier `services/` pour les appels API.

---

## 🔁 Bonus possibles
- Ajout de catégories ou tags pour les recettes.
- Système de recherche ou de tri.
- Filtrage par utilisateur connecté.
- Interface responsive et animations douces.

---

## 📦 Livrable attendu
- Une **API REST Express** fonctionnelle et sécurisée.
- Une **application React** bien structurée, interconnectée à l’API.
- Code bien commenté, organisé, et facilement testable.