const db = require("../models/db.js");
const { validationResult } = require('express-validator')
const imageMiddleware = require("../middlewares/image.js")
const recipeController = {
	getRecipes: async (req, res) => {
		try {
			const recipes = await db.getAllRecipes();

			res.json({
				status: 200,
				data: recipes,
			});
		} catch (error) {
			console.error("Error fetching recipes:", error);
		}
	},

	getRecipeById: async (req, res) => {
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
	},

	

	create: async (req, res) => {
		try {
			const { title, description, author, date, user_id } =
				req.body;
			const host = req.get('host')
			const image = `${req.protocol}://${host}/images/${req.file.filename}`;
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				// const messages = errors.array().map(err => err.msg);
				return res.status(400).json({ messages: errors.array() })
			}

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
	},

	update: async (req, res) => {
		try {
			const { title, description, author, date, user_id } =
				req.body;
			const host = req.get('host')
			const image = `${req.protocol}://${host}/images/${req.file.filename}`;
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				// const messages = errors.array().map(err => err.msg);
				return res.status(400).json({ messages: errors.array() })
			}

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
	},
	delete: async (req, res) => {
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
	},
};

const commentsController = {
	create: async (req, res) => {
		try {
			const { title, content, userId } = req.body;

			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				// const messages = errors.array().map(err => err.msg);
				return res.status(400).json({ messages: errors.array() })
			}
			
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
	},
	delete: async (req, res) => {
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
	},
};

module.exports = {
	recipeController,
	commentsController,
};
