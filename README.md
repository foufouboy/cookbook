# cookbook

# Projet React – Intégration + Fonctionnalités dynamiques

## 🔧 Contexte
Vous disposez d’un backend déjà prêt, ainsi que d’un début d’intégration HTML/CSS (fourni) basé sur cette maquette Figma :  
👉 [Maquette Figma – Sophie Bluel](https://www.figma.com/design/kfKHknHySoTibZfdolGAX6/Sophie-Bluel---Desktop?node-id=0-1&p=f&t=LgX4GIEnSbXUe0m1-0)

## 📌 Objectif
Reprendre ce projet pour le **convertir intégralement en React**, et y intégrer la logique dynamique nécessaire.

---

## ✅ Travail demandé

### 1. Convertir l'intégration HTML en React :
- Découpez proprement le code en composants réutilisables.
- Intégrez le style fourni.

### 2. Page d’accueil :
- Récupérez les projets via l’API.
- Affichez dynamiquement les travaux.
- Affichez les filtres par catégorie (venant de l’API également).
- Faites fonctionner la **filtration des projets par catégorie**.

### 3. Page de connexion :
- Créez un formulaire de login.
- Envoyez les identifiants à l’API.
- Stockez le token de connexion dans le `localStorage`.

### 4. Page d’administration (accessible uniquement si l’utilisateur est connecté) :
- Affichez les projets existants.
- Permettez la **suppression d’un projet** via une popup de confirmation.
- Ajoutez une **2ᵉ popup** pour **ajouter un projet** (avec envoi à l’API + affichage de la preview de l’image).

---

## 💡 Recommandations
- Organisez votre projet en dossiers (`components/`, `pages/`, `services/`, etc.).
- Utilisez `fetch` ou `axios` pour les appels à l’API.
- Utilisez le `localStorage` pour la persistance du token.
- Mettez en place un système simple de **routing** avec `react-router`.

---

## 📦 Livrable attendu
Un projet React complet, fonctionnel, proprement structuré, répondant aux fonctionnalités ci-dessus, et fidèle à la maquette.