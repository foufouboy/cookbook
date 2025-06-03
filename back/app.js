// salut
const userRoutes = require("./routes/userRoutes.js");
const recipeRoutes = require("./routes/recipeRoutes.js");

const express = require("express");
const app = express();

app.use("/", userRoutes);

app.use("/", recipeRoutes);


const PORT = 3000;

app.listen(PORT, () => {
	console.log("Salut ^^");
});

/**
 * PUBLIC
 *
 * "/recipes/" - GET - Afficher les recettes
 * "/recipes/:recipe_id" - GET - Afficher la recette/commentaires
 * "/recipes/:recipe_id/comments" - POST - Créer un commentaire
 * "/recipes/:recipe_id/comments" - DELETE - Supprimer un commentaire
 *
 * PRIVÉ
 *
 * "/auth/login" - POST - Afficher page de login
 * "/auth/register" - POST - Afficher page de register
 *
 * "/user/" - GET - Page utilisateur
 * "/recipes/" - POST - Créer une nouvelle recette
 * "/recipes/:recipe_id" - PUT - Modifier recette
 * "/recipes/:recipe_id" - DELETE - Supprimer recette
 */

/**
 * MODELS
 *
 * recipes : {
 *  name: string,
 *  ingredients: [] string
 * }
 * ADMIN : Tout.
 * USER : Voir les recettes / Commenter
 */
