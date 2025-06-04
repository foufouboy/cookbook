const { get } = require("http");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dbConnection = require("./mongodb.js");

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
        return res.status(400).json({ message: "Utilisateur déjà existant !" });
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

      if (!ObjectId.isValid(recipeId)) {
        throw new Error("Recipe Id format is invalid");
      }

      const database = await dbConnection();
      const recipes = database.collection("recipes");
      const recipe = await recipes.findOne({ _id });

      if (!recipe) {
        return null;
      }

      return recipe;
    } catch (error) {
      console.error("Error getting recipe by id :", error);
      throw error;
    }
  },
};

module.exports = db;
