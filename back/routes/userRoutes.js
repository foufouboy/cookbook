const userRoutes = require("express").Router();
const userController = require("../controllers/userController.js");
const { validatedUser } = require("../middlewares/validator.js");
// HOME
userRoutes.get("/", (req, res) => res.redirect("recipes"));

// LOGIN & REGISTER
userRoutes.post("/auth/login", userController.login);
userRoutes.post("/auth/logout", userController.logout);

userRoutes.post("/auth/register", validatedUser, userController.register);

module.exports = userRoutes;
