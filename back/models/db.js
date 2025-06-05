const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ObjectId = require("mongodb").ObjectId;
const key = process.env.SECRET_KEY;

const dbConnection = require("./mongodb.js");
const { create } = require("domain");

const db = {
	async login(name, email, password) {
		try {
			const database = await dbConnection();
			const dataUser = database.collection("users");

			const verifyUser =
				(await dataUser.findOne({ name })) ||
				(await dataUser.findOne({ email }));

			if (!verifyUser) {
				return {
					status: 400,
					message: "Utilisateur non trouvé !",
				};
			}

			const passwordVerify = await bcrypt.compare(
				password,
				verifyUser.password
			);

			if (!passwordVerify) {
				return {
					status: 400,
					message: "Mot de passe !",
				};
			}

			if (verifyUser.role) {
				const token = jwt.sign({ data: verifyUser.role }, key, {
					expiresIn: "3h",
				});

				await dataUser.updateOne(
					{ email: verifyUser.email },
					{
						$set: { jwt: token },
					}
				);
				return {
					status: 200,
					message: "Connexion réussie",
					token,
				};
			}
		} catch (error) {
			console.log(error.message);
		}
	},
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
			const formatedId = new ObjectId(recipeId);

			if (!ObjectId.isValid(formatedId)) {
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

	async createRecipe({ title, description, author, image, date, user_id }) {
		try {
			const database = await dbConnection();
			const recipes = database.collection("recipes");

			if (!title || !description || !author || !user_id) {
				throw new Error(
					"Missing fields : title description author or userId"
				);
			}

			// const userObjectId = new ObjectId(user_id);

			const recipe = {
				title,
				description,
				author,
				image: image || null,
				date: date || new Date(),
				user_id: user_id,
			};

			const result = await recipes.insertOne(recipe);
		} catch (error) {
			console.error("Error adding recipe:", error);
			throw error;
		}
	},

	/**
	 * Deletes a recipe by its ID.
	 * @param {string} recipeId - The ID of the recipe to delete.
	 * @returns {Promise<void>} A promise that resolves when the recipe is deleted.
	 */

	async deleteRecipe(recipeId) {
		try {
			const formatedId = new ObjectId(recipeId);
			console.log(formatedId);

			if (!ObjectId.isValid(formatedId)) {
				throw new Error("Recipe Id format is invalid");
			}

			const database = await dbConnection();
			const recipes = database.collection("recipes");
			const recipe = await recipes.findOne({ _id: formatedId });

			if (!recipe) {
				return null;
			}

			return recipe;
		} catch (error) {
			console.error("Error getting recipe by id :", error);
			throw error;
		}
	},

	/**
	 * Updates a recipe by its ID.
	 * @param {string} recipeId - The ID of the recipe to update.
	 * @param {Object} updateData - The data to update the recipe with.
	 * @returns {Promise<void>} A promise that resolves when the recipe is updated.
	 */

	async updateRecipe(
		recipeId,
		{ title, description, author, image, date, user_id }
	) {
		try {
			const database = await dbConnection();
			const recipes = database.collection("recipes");

			await recipes.updateOne(
				{ _id: new ObjectId(recipeId) },
				{
					$set: {
						title,
						description,
						author,
						image: image || null,
						date: date || new Date(),
						user_id: user_id,
					},
				}
			);

			return 200;
		} catch (error) {
			console.error("Error updating comment", error);
		}
	},

	/**
	 * Creates a new comment for a recipe.
	 * @param {string} recipeId - The ID of the recipe to comment on.
	 * @param {Object} commentData - The data for the new comment.
	 * * @returns {Promise<void>} A promise that resolves when the comment is created.
	 */

	async createComment({ title, content, userId, recipeId }) {
		try {
			const database = await dbConnection();
			const recipes = database.collection("recipes");

			if (!title || !content || !recipeId) {
				throw new Error("Missing fields");
			}

			const comment = {
				_id: new ObjectId(),
				title,
				content,
				userId: null, // temporary
				recipeId: new ObjectId(recipeId),
				date: new Date(),
			};

			await recipes.updateOne(
				{ _id: new ObjectId(recipeId) },
				{ $push: { comments: comment } }
			);

			return comment;

		} catch (error) {
			console.error("Error creating comment:", error);
		}
	},

	/**
	 * Deletes a comment by its ID.
	 * @param {string} recipeId - The ID of the recipe from which to delete the comment.
	 * @param {string} commentId - The ID of the comment to delete.
	 * @returns {Promise<void>} A promise that resolves when the comment is deleted.
	 */

	async deleteComment(recipeId, commentId) {
		try {
			const database = await dbConnection();
			const recipes = database.collection("recipes");

			const result = await recipes.updateOne(
				{ _id: new ObjectId(recipeId) },
				{ $pull: { comments: { _id: new ObjectId(commentId) } } }
			);

			if (result.modifiedCount === 0) {
				return null;
			}

			return 200;
		} catch (error) {
			console.error("Error deleting comment:", error);
		}
	},
};

module.exports = db;
