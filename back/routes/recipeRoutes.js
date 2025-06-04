const recipeRoutes = require("express").Router();
const db = require("../models/db");

// GET
// TODO: Récupérer recettes et les envoyer en réponse
recipeRoutes.get("/recipes", async (req, res) => {
	try {
		const recipes = await db.getAllRecipes();

		res.json({
			status: 200,
			data: recipes,
		});
	} catch (error) {
		console.error("Error fetching recipes:", error);
	}
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

// POST COMMENTS
recipeRoutes.post("/recipes/:recipe_id/comments", (req, res) => {
	const { idRecipe } = req.params;
	res.send(`TO IMPLEMENT (post req to /:recipe_id/comments)`);
});

// DEL COMMENTS
recipeRoutes.delete("/recipes/:recipe_id/comments", (req, res) => {
	const { idRecipe } = req.params;
	res.send(`TO IMPLEMENT (del request to /:recipe_id/comments)`);
});

module.exports = recipeRoutes;
