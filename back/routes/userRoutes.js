const userRoutes = require("express").Router();
const bcrypt = require('bcrypt')
const client = require("../models/mongodb.js");
const database  = client.db("Cookbook_DB");
const dataUser = database.collection('users')
// GET
userRoutes.get("/", (req, res) => res.send("user"));

// AUTH
// POST LOGIN
userRoutes.post("/auth/login", (req, res) => {
    res.send("TO IMPLEMENT (post req to /auth/login)")
});

// POST REGISTER
userRoutes.post("/auth/register", async (req, res) => {
    console.log(req.params)
    const { username, email, password } = req.body
    
    try {
        const verifyUser = await dataUser.findOne({email})
        if(verifyUser){
            return res.status(400).json({message : 'Utilisateur déjà existant !'})
        }

        const passwordHashed = await bcrypt.hash(password, 10);

        const result = await dataUser.insertOne({
            username,
            email,
            password : passwordHashed,
            role : 'Roles_User'
        })

        if(result){
            res.status(200).json({message : "Ajout de l'utilisateur"})
        }else{
            res.status(500).json({message : 'Problème de la part du serveur'})
        }

    } catch (err) {
        res.status(400).json({message : err})
    }
    res.send("TO IMPLEMENT (post req to /auth/register)")

});

module.exports = userRoutes;