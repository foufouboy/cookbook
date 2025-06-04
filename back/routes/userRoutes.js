const userRoutes = require("express").Router();
const bcrypt = require('bcrypt');
const db = require("../models/mongodb.js");
const jwt = require('jsonwebtoken');
const key = process.env.SECRET_KEY;
// const dataUser = client.collection('users')
// GET
userRoutes.get("/", (req, res) => res.send("user"));

// AUTH
// POST LOGIN
userRoutes.post("/auth/login", async (req, res) => {
    const { name, password, email } = req.body
    try {
        const database = await db();
        const dataUser = database.collection('users')

        const verifyUser = await dataUser.findOne({ name }) || await dataUser.findOne({ email })
        console.log(verifyUser)
        if (!verifyUser) {
            return res.status(400).json({ message: "L'utilisateur n'existe pas !" })
        }
        const passwordVerify = await bcrypt.compare(password, verifyUser.password);

        if (!passwordVerify) {
            return res.status(400).json({ message: "Le mot de passe n'est pas bon !" })
        }
        if (verifyUser.role === "admin") {
            const token = jwt.sign({ data: 'admin' }, key , { expiresIn: '3h' });

            await dataUser.updateOne(
                { email: verifyUser.email },
                {
                    $set: { jwt: token }
                }
            );
            res.status(200).json({ message: 'vous êtes bien connecté !', token })
        }

        if (verifyUser.role === "user") {
            const token = jwt.sign({ data: 'user' }, key , { expiresIn: '3h' });

            await dataUser.updateOne(
                { _id: verifyUser._id },
                {
                    $set: { jwt: token }
                }
            );
            res.status(200).json({ message: 'vous êtes bien connecté !', token })
        }

    } catch (error) {
        console.log(error)
    }

});

// POST REGISTER
userRoutes.post("/auth/register", async (req, res) => {
    console.log(req.params)
    const { name, email, password } = req.body

    try {
        const database = await db();
        const dataUser = database.collection('users')

        const verifyUser = await dataUser.findOne({ email })
        if (verifyUser) {
            return res.status(400).json({ message: 'Utilisateur déjà existant !' })
        }

        const passwordHashed = await bcrypt.hash(password, 10);

        const result = await dataUser.insertOne({
            name,
            email,
            password: passwordHashed,
            role: 'user',
            jwt
        })

        if (result) {
            res.status(200).json({ message: "Ajout de l'utilisateur" })
        } else {
            res.status(500).json({ message: 'Problème de la part du serveur' })
        }

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});

module.exports = userRoutes;