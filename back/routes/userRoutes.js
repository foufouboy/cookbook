const userRoutes = require("express").Router();

const userController = require("../controllers/userController.js");
const authMiddleware = require('../middlewares/auth.js')

const { validatedUser } = require("../middlewares/validator.js");
// HOME

userRoutes.get("/user", authMiddleware, (req, res) => res.json({message : req.user}));


// LOGIN & REGISTER
userRoutes.post("/auth/login", userController.login);

userRoutes.post("/auth/logout", userController.logout);

userRoutes.post("/auth/register", validatedUser, userController.register);


module.exports = userRoutes;
//ALED GIT
