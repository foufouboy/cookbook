const recipeRoutes = require("express").Router();
const {
	recipeController,
	commentsController,
} = require("../controllers/recipeController");
const { validatedRecipe, validatedComment } = require('../middlewares/validator.js')
const authMiddleware = require('../middlewares/auth.js')

// RECIPES
recipeRoutes.get("/recipes", recipeController.getRecipes);
recipeRoutes.get("/recipes/:recipe_id", recipeController.getRecipeById);

recipeRoutes.post("/recipes", authMiddleware, validatedRecipe, recipeController.create);
recipeRoutes.put("/recipes/:recipe_id", validatedRecipe, recipeController.update);
recipeRoutes.delete("/recipes/:recipe_id", recipeController.delete);


// COMMENTS

recipeRoutes.post("/recipes/:recipe_id/comments", validatedComment, commentsController.create);
recipeRoutes.delete("/recipes/:recipe_id/comments", commentsController.delete);

// TODO: Validations

module.exports = recipeRoutes;
