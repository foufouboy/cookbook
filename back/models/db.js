const bcrypt = require("bcrypt");

const dbConnection = require("./mongodb.js");
const { create } = require("domain");

const db = {
	/**
	 * Creates a new user in the database.
	 * @param {string} name - The name of the user.
	 * @param {string} email - The email of the user.
	 * @param {string} password - The password of the user.
	 * @returns {Promise<void>} A promise that resolves when the user is created.
	 */

	async createUser(name, email, password) {
		try {
			const database = await dbConnection();
			const dataUser = database.collection("users");

			const verifyUser = await dataUser.findOne({ email });
			if (verifyUser) {
				return res
					.status(400)
					.json({ message: "Utilisateur déjà existant !" });
			}

			const passwordHashed = await bcrypt.hash(password, 10);

			const result = await dataUser.insertOne({
				name,
				email,
				password: passwordHashed,
				role: "user",
				jwt: null,
			});

			return result;
		} catch (error) {
			console.error("Error creating user:", error);
		}
	},

	/**
	 * Fetches all recipes from the database.
	 * @returns {Promise<Array>} A promise that resolves to an array of recipes.
	 */

	async getAllRecipes() {
		try {
			const database = await dbConnection();
			const recipes = database.collection("recipes");
			const recipeList = await recipes.find({}).toArray();
			return recipeList;
		} catch (error) {
			console.error("Error fetching recipes:", error);
			throw error;
		}
	},

	/**
	 * Fetches a recipe by its ID.
	 * @param {string} recipeId - The ID of the recipe to fetch.
	 * @returns {Promise<Object>} A promise that resolves to the recipe object.
	 */

	async getRecipeById(recipeId) {
		try {

			const ObjectId = require("mongodb").ObjectId;
			
			if (!ObjectId.isValid(recipeId)){
				throw new Error("Recipe Id format is invalid");
				console.log("salut^^");
			}
			

			const database = await dbConnection();
			const recipes = database.collection("recipes");
			const recipe = await recipes.findOne({ _id: formatedId });

			if (!recipe) {
				console.log("1");
				return null;
			}

			return recipe;
		} catch (error) {
			console.error("Error getting recipe by id :", error);
			throw error;
		}
	},

	/**
	 * Creates a new recipe in the database.
	 * @param {Object} recipeData - The data for the new recipe.
	 * @returns {Promise<void>} A promise that resolves when the recipe is created.
	 */

	async createRecipe({ title, description, author, image, date, userId }) {},

	/**
	 * Deletes a recipe by its ID.
	 * @param {string} recipeId - The ID of the recipe to delete.
	 * @returns {Promise<void>} A promise that resolves when the recipe is deleted.
	 */

	async deleteRecipe(recipeId) {},

	/**
	 * Updates a recipe by its ID.
	 * @param {string} recipeId - The ID of the recipe to update.
	 * @param {Object} updateData - The data to update the recipe with.
	 * @returns {Promise<void>} A promise that resolves when the recipe is updated.
	 */

	async updateRecipe(recipeId, updateData) {},

	/**
	 * Creates a new comment for a recipe.
	 * @param {string} recipeId - The ID of the recipe to comment on.
	 * @param {Object} commentData - The data for the new comment.
	 * * @returns {Promise<void>} A promise that resolves when the comment is created.
	 */

	async createComment(recipeId, commentData) {},

	/**
	 * Deletes a comment by its ID.
	 * @param {string} recipeId - The ID of the recipe from which to delete the comment.
	 * @param {string} commentId - The ID of the comment to delete.
	 * @returns {Promise<void>} A promise that resolves when the comment is deleted.
	 */

	async deleteComment(recipeId, commentId) {},
};

module.exports = db;
