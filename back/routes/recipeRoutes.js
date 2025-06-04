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

// GET ID
recipeRoutes.get("/recipes/:recipe_id", async (req, res) => {

	try {
		const { recipe_id } = req.params;
		const recipe = await db.getRecipeById(recipe_id);

		if (!recipe) {
			res.status(404).send("Recipe doesn't exist")
			return;
		}

		res.status(200).json(recipe);

	} catch (error) {
		res.status(500).json({ message: "Recipe not retrieved" })
	}
});

// POST
recipeRoutes.post("/recipes", async (req, res) => {
	try {
		
		const { title, description, author, image, date, user_id } = req.body;
		const newRecipe = await db.createRecipe({title, description, author, image, date, user_id});

		res.status(201).json({
			message: "reciped added",
			recipe: newRecipe,
		});

	} catch (error) {
		res.status(500).json({
			message: "error creating recipe",
			error: error.message,
		});

	}
});

// PUT
recipeRoutes.put("/recipes/:recipe_id", async (req, res) => {
	res.send(`TO IMPLEMENT (put req to recipes/${recipe_id})`);
});

// DEL RECIPE
// recipeRoutes.delete("/recipes/:recipe_id", async (req, res) => {
// 	try {
// 		const { recipe_id } = req.params;
// 		const recipe = await db.deleteRecipe(recipe_id);

// 		if (!recipe) {
// 			res.status(404).send("Recipe doesn't exist")
// 			return;
// 		}

// 		res.status(200).json(recipe);

// 	} catch (error) {
// 		res.status(500).json({ message: "Recipe not retrieved" })
// 	}.send("TO IMPLEMENT (del req to recipes/:recipe_id)")
// }
// );



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
