const userRoutes = require("express").Router();

userRoutes.get("/", (req, res) => res.send("user"));

module.exports = userRoutes;