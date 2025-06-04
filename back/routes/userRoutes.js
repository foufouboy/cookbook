const userRoutes = require("express").Router();

// GET
userRoutes.get("/", (req, res) => res.send("user"));

// AUTH
// POST LOGIN
userRoutes.post("/auth/login", (req, res) => res.send("TO IMPLEMENT (post req to /auth/login)"));

// POST REGISTER
userRoutes.post("/auth/register", (req, res) => res.send("TO IMPLEMENT (post req to /auth/register)"));

module.exports = userRoutes;