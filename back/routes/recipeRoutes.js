const recipeRoutes = require("express").Router();
const db = require("../models/db");

// GET
recipeRoutes.get("/recipes", (req, res) => {
	// const recipes = await db.getAllRecipes();

	res.json({
		status: 200,
		data: [],
	});
});

// POST
recipeRoutes.post("/recipes", (req, res) =>
	res.send("TO IMPLEMENT (post req to recipe)")
);

// PUT
recipeRoutes.put("/recipes/:recipe_id", (req, res) => {
	const { recipe_id } = req.params;
	res.send(`TO IMPLEMENT (put req to recipes/${recipe_id})`);
});

// DEL RECIPE
recipeRoutes.delete("/recipes/:recipe_id", (req, res) =>
	res.send("TO IMPLEMENT (del req to recipes/:recipe_id)")
);

// GET ID
recipeRoutes.get("/recipes/:recipe_id", (req, res) => {
	const { idRecipe } = req.params;
	res.send(`TO IMPLEMENT (get req to recipes/)`);
});

// COMMENTS

recipeRoutes.post(
	"/recipes/:recipe_id/comments",
	validatedComment,
	commentsController.create
);
recipeRoutes.delete("/recipes/:recipe_id/comments", commentsController.delete);

// TODO: Validations

module.exports = recipeRoutes;
