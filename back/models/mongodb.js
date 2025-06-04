const { MongoClient, ServerApiVersion } = require("mongodb");

// Replace the placeholder with your Atlas connection string
const url = process.env.MONGO_DB_URL;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDb() {
  await client.connect();
  const database = client.db("Cookbook_DB");
  return database;
}

module.exports = connectDb;
