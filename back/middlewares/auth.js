const jwt = require("jsonwebtoken");

// isUser
const authMiddleware = (req, res, next) => {
	const authHeader = req.headers["authorization"]?.split(" ")[1];
	console.log("authHeader", authHeader);

	if (!authHeader)
		return res
			.status(403)
			.json({ message: "Accès refusé. Token non fourni" });

	try {
		const decoded = jwt.verify(authHeader, process.env.SECRET_KEY);
		req.user = decoded;
		next();
	} catch (error) {
		res.status(400).send("Token non valide ==> caca le token");
	}
};

const isAdmin = (req, res, next) => {
	/**
	 *
	 */
};

module.exports = authMiddleware;
