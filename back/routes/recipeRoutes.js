const recipeRoutes = require("express").Router();
const {
	recipeController,
	commentsController,
} = require("../controllers/recipeController");

// RECIPES

recipeRoutes.get("/recipes", recipeController.getRecipes);
recipeRoutes.get("/recipes/:recipe_id", recipeController.getRecipeById);

recipeRoutes.post("/recipes", recipeController.create);
recipeRoutes.put("/recipes/:recipe_id", recipeController.update);
recipeRoutes.delete("/recipes/:recipe_id", recipeController.delete);
recipeRoutes.put("/recipes/:recipe_id", recipeController.update);
recipeRoutes.delete("/recipes/:recipe_id", recipeController.delete);

// COMMENTS

recipeRoutes.post("/recipes/:recipe_id/comments", commentsController.create);
recipeRoutes.delete("/recipes/:recipe_id/comments", commentsController.delete);

// TODO: Validations

module.exports = recipeRoutes;
