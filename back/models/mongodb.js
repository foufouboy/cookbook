const { MongoClient, ServerApiVersion } = require("mongodb");

// Replace the placeholder with your Atlas connection string
const url = process.env.MONGO_URI;
const env =
  "mongodb+srv://Loazo:z1x2c3v4@mongotest.wefhjgu.mongodb.net/?retryWrites=true&w=majority&appName=mongoTest";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

async function connectDb() {
  await client.connect();
  const database = client.db("Cookbook_DB");
  return database;
}

module.exports = connectDb;
