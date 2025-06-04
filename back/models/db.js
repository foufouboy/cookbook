const client = require("./mongodb.js");
const database = client.db("Cookbook_DB");
const recipes = database.collection("recipes");

const db = {
	async getAllRecipes() {
		try {
			const recipeList = await recipes.find({}).toArray();
			return recipeList;
		} catch (error) {
			console.error("Error fetching recipes:", error);
			throw error;
		}
	},
};

module.exports = db;
