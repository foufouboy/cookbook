// salut
const userRoute = require("./routes/userRoute.js");

const express = require("express");
const app = express();

app.use(userRoute);
app.get("/", (req, res) => res.send("hello"));

const PORT = 3000;

app.listen(PORT, () => {
    console.log("Salut ^^")
})

// test