const recipeRoutes = require("express").Router();
const db = require("../models/db");

// GET
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
			res.status(404).send("Recipe doesn't exist");
			return;
		}

		res.status(200).json(recipe);
	} catch (error) {
		res.status(500).json({ message: "Recipe not retrieved" });
	}
});

// POST
recipeRoutes.post("/recipes", async (req, res) => {
	try {
		const { title, description, author, image, date, user_id } = req.body;
		const newRecipe = await db.createRecipe({
			title,
			description,
			author,
			image,
			date,
			user_id,
		});

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
	try {
		const { title, description, author, image, date, user_id } = req.body;
		const { recipe_id } = req.params;

		const updatedRecipe = await db.updateRecipe(recipe_id, {
			title,
			description,
			author,
			image,
			date,
			user_id,
		});

		res.status(201).json({
			message: "reciped added",
			recipe: updatedRecipe,
		});
	} catch (error) {
		res.status(500).json({
			message: "error creating recipe",
			error: error.message,
		});
	}
});

recipeRoutes.delete("/recipes/:recipe_id", async (req, res) => {
	try {
		const { recipe_id } = req.params;
		const recipe = await db.deleteRecipe(recipe_id);

		if (!recipe) {
			res.status(404).send("Recipe doesn't exist");
			return;
		}

		res.status(200).json(recipe);
	} catch (error) {
		res.status(500).json({ message: "Recipe not retrieved" });
	}
});

// POST COMMENTS
recipeRoutes.post("/recipes/:recipe_id/comments", async (req, res) => {
	try {
		const { title, content, userId } = req.body;
		const { recipe_id } = req.params;
		const newComment = await db.createComment({
			title,
			content,
			userId,
			recipeId: recipe_id,
		});

		if (!newComment) {
			res.status(400).json({
				message: "Error on comment!",
			});
		}

		res.status(200).json({
			message: "comment added",
			comment: newComment,
		});
	} catch (error) {
		res.status(500).json({
			message: "error creating comment",
			error: error.message,
		});
	}
});

// DEL COMMENTS
recipeRoutes.delete("/recipes/:recipe_id/comments", async (req, res) => {
	const { recipe_id } = req.params;
	const { commentId } = req.body;

	try {
		const result = await db.deleteComment(recipe_id, commentId);

		if (!result) {
			res.status(400).json({
				message: "Error deleting comment",
			});
		}

		res.json({
			status: 200,
			message: "Comment deleted successfully",
		});
	} catch (error) {
		console.error("Error deleting the comment: ", error);
	}
});

// TODO: Validations
// TODO: Refactor dans controllers
// Middleware Auth

module.exports = recipeRoutes;
