const express = require("express");
const { client, connectToMongoDB } = require("./db");
const app = express();
const PORT = 3000;

// Middleware para permitir CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
  connectToMongoDB();
});

app.get("/guitarrasElectricas", async (req, res) => {
  try {
    const collection = client
      .db("instrumentos-musicales")
      .collection("guitarras");
    const guitarras = await collection.find({}).toArray();
    res.json(guitarras);
  } catch (error) {
    console.error(
      "Error al obtener los datos de la colección de guitarras:",
      error
    );
    res.status(500).json({
      error: "Error al obtener los datos de la colección de guitarras",
    });
  }
});

process.on("SIGINT", async () => {
  await client.close();
  console.log("MongoDB connection closed.");
  process.exit(0);
});
