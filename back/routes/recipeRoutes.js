const recipeRoutes = require("express").Router();
const {
	recipeController,
	commentsController,
} = require("../controllers/recipeController");
const {
	validatedRecipe,
	validatedComment,
} = require("../middlewares/validator.js");
const authMiddleware = require("../middlewares/auth.js");
const multer = require('../middlewares/image.js');

// RECIPES
recipeRoutes.get("/recipes", recipeController.getRecipes);
recipeRoutes.get("/recipes/:recipe_id", recipeController.getRecipeById);

recipeRoutes.post(
	"/recipes",
	authMiddleware,
	validatedRecipe,
	multer,
	recipeController.create
);
recipeRoutes.put(
	"/recipes/:recipe_id",
	authMiddleware,
	validatedRecipe,
	multer,
	recipeController.update
);
recipeRoutes.delete(
	"/recipes/:recipe_id",
	authMiddleware,
	recipeController.delete
);

// COMMENTS

recipeRoutes.post(
	"/recipes/:recipe_id/comments",
	validatedComment,
	commentsController.create
);
recipeRoutes.delete("/recipes/:recipe_id/comments", commentsController.delete);

// TODO: Validations

module.exports = recipeRoutes;
