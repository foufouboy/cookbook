const db = require("../models/db.js");
const {validationResult} = require('express-validator');
const userController = {
	register: async (req, res) => {
		const { name, password, email } = req.body;
		const errors = validationResult(req)
		const result = await db.login(name, email, password);

		if(!errors.isEmpty()){
			// const messages = errors.array().map(err => err.msg);
			
			return res.status(400).json({messages : errors.array()})
		}
		if (result) {
			res.status(200).json({
				token: result.token,
				message: "Connexion réussie",
			});
		} else {
			res.status(500).json({ message: "Connexion échouée" });
		}
	},

	login: async (req, res) => {
		const { name, email, password } = req.body;
		console.log(req.body);
		const result = await db.createUser(name, email, password);

		if (result) {
			res.status(200).json({ message: "Ajout de l'utilisateur" });
		} else {
			res.status(500).json({ message: "Problème de la part du serveur" });
		}
	},
};

module.exports = userController;
