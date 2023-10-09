const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://kmilom19:E0UwKkoosHB0ERPH@tiendavirtual.e5jopz0.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = { client, connectToMongoDB };
