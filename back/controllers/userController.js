const db = require("../models/db.js");
const { validationResult } = require("express-validator");

const userController = {
	login: async (req, res) => {
		const { name, password, email } = req.body;
		const result = await db.login(name, email, password);

		if (result.status === 200) {
			res.status(200).json({
				token: result.token,
				message: "Connexion réussie",
			});
		} else {
			res.status(400).json({
				message: "Connexion échouée",
				error: result.message,
			});
		}
	},

	logout: async (req, res) => {
		const result = await db._logout();

		if (result) {
			res.status(200).json({ message: "Déconnexion réussie" });
		} else {
			res.status(500).json({ message: "Problème de la part du serveur" });
		}
	},

	register: async (req, res) => {
		const { name, email, password } = req.body;
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			// const messages = errors.array().map(err => err.msg);
			return res.status(400).json({ messages: errors.array() });
		}

		const result = await db.createUser(name, email, password);
		if(result.message){
			res.status(400).json({ message: result.message });
		}
		
		if (result) {
			res.status(200).json({ message: "Ajout de l'utilisateur" });
		} else {
			res.status(500).json({ message: "Problème de la part du serveur" });
		}
	},
};

module.exports = userController;
