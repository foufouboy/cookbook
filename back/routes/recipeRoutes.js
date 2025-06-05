const recipeRoutes = require("express").Router();
const {
	recipeController,
	commentsController,
} = require("../controllers/recipeController");

// GET
recipeRoutes.get("/recipes", recipeController.getRecipes);

// GET ID
recipeRoutes.get("/recipes/:recipe_id", recipeController.getRecipeById);

// POST
recipeRoutes.post("/recipes", recipeController.create);

// PUT
recipeRoutes.put("/recipes/:recipe_id", recipeController.update);

recipeRoutes.delete("/recipes/:recipe_id", recipeController.delete);

// POST COMMENTS
recipeRoutes.post("/recipes/:recipe_id/comments", commentsController.create);

// DEL COMMENTS
recipeRoutes.delete("/recipes/:recipe_id/comments", commentsController.delete);

// TODO: Validations
// TODO: Refactor dans controllers
// Middleware Auth

module.exports = recipeRoutes;
