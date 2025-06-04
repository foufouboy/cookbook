require("dotenv").config();

const express = require("express");

const app = express();



app.use(express.json())
const userRoutes = require("./routes/userRoutes.js");
const recipeRoutes = require("./routes/recipeRoutes.js");

app.use("/", userRoutes);
app.use("/", recipeRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

/**
 * PUBLIC
 *
 * "/recipes/" - GET - Afficher les recettes
 * "/recipes/" - POST - Créer une nouvelle recette
 *
 * "/recipes/:recipe_id" - GET - Afficher la recette/commentaires
 * "/recipes/:recipe_id" - PUT - Modifier recette
 * "/recipes/:recipe_id" - DELETE - Supprimer recette
 *
 * "/recipes/:recipe_id/comments" - POST - Créer un commentaire
 * "/recipes/:recipe_id/comments" - DELETE - Supprimer un commentaire
 *
 * PRIVÉ
 *
 * "/auth/login" - POST - Afficher page de login
 * "/auth/register" - POST - Afficher page de register
 *
 * "/user/" - GET - Page utilisateur
 *
 *
 */

/**
 * MODELS
 *
 * recipe : {
 *  id: uuid,
 *  title: string,
 *  description: string,
 *  author: string,
 *  image: url/blob,
 *  date: date,
 *  user_id: vvv
 * }
 *
 * user : {
 *  id: uuid,
 *  name: string,
 *  role: "user" | "admin",
 *  email: string,
 *  hash: string,
 *  password: string,
 * }
 *
 * comment: {
 *  id: uuid,
 *  title: string,
 *  content: string,
 *  user_id: string,
 *  recipe_id: string,
 * }
 *
 * mongodb
 *
 * ADMIN : Tout.
 * USER : Voir les recettes / Commenter
 */
