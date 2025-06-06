const client = require("./mongodb.js");

const database = client.db("Cookbook_DB");
const recipes = database.collection("recipes");
const users = database.collection("users");
const comments = database.collection("comments");

async function run() {
	try {
		// Connect the client to the server (optional starting in v4.7)
		await client.connect();

		// Send a ping to confirm a successful connection
		await client.db("admin").command({ ping: 1 });
		console.log(
			"Pinged your deployment. You successfully connected to MongoDB!"
		);
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
}

run.catch(console.error);
