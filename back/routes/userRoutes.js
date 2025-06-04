const userRoutes = require("express").Router();
const db = require("../models/db.js");
const jwt = require("jsonwebtoken");
const key = process.env.SECRET_KEY;

// GET
userRoutes.get("/", (req, res) => res.send("user"));

// AUTH
// POST LOGIN
userRoutes.post("/auth/login", async (req, res) => {
	const { name, password, email } = req.body;

	const result = await db.login(name, email, password);
	console.log(result);

	if (result) {
		res.status(200).json({
			token: result.token,
			message: "Connexion réussie",
		});
	} else {
		res.status(500).json({ message: "Connexion échouée" });
	}
});

// POST REGISTER
// TODO: Valider les champs (email, password, name)

userRoutes.post("/auth/register", async (req, res) => {
	const { name, email, password } = req.body;
	console.log(req.body);
	const result = await db.createUser(name, email, password);

	if (result) {
		res.status(200).json({ message: "Ajout de l'utilisateur" });
	} else {
		res.status(500).json({ message: "Problème de la part du serveur" });
	}
});

module.exports = userRoutes;
