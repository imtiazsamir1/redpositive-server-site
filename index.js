const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const port = process.env.PORT || 5000;
const app = express();

// midleware
app.use(cors());
app.use(express.json());

// redpositive1
// 0LezrBHxs9HFjDjs

const uri =
  "mongodb+srv://redpositive1:0LezrBHxs9HFjDjs@cluster0.zdt5s4o.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
// 
async function run() {
  try {
    await client.connect();
    const collection = client.db("redpositive_data").collection("persons");
    const dataCollection = client.db("redpositive_data").collection("data");

    app.get("/person", async (req, res) => {
      const query = {};
      const cursor = collection.find(query);
      const persons = await cursor.toArray();
      res.send(persons);
    });

    app.post("/person", async (req, res) => {
      const person = req.body;

      const result = await collection.insertOne(person);

      res.send(result);
    });

    app.delete("/data/:id", async (req, res) => {
      const id = req.params;
      console.log(id);
      const query = { _id: ObjectId(id) };

      const result = await collection.deleteOne(query);
      res.send(result);
    });
    // app.delete("/data/is", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const result = await collection.deleteOne(query);
    //   res.send(result);
    // });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("hlw ki khobor");
});

app.listen(port, () => {
  console.log("listen to port", port);
});
