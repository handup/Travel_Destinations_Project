const { MongoClient, ServerApiVersion } = require("mongodb");

const express = require('express');
const app = express();
const cors = require('cors'); // Import the 'cors' package

const port = 3000;

const hostname = '127.0.0.1';
const uri = `mongodb://${hostname}:27017`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.use(cors({
  origin: '*', // Replace '*' with the actual origin(s) in a production environment
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));


// GET localhost:40000/destinations => return all destinations
app.get('/destinations', async (req, res) => {

  const db = client.db("travel_destination")
  const tdCollection = db.collection("destinations")
  const result = await tdCollection.find().toArray()
  res.send(result);
});

// POST localhost:40000/destinations => add a new destination
app.post('/destinations', async (req, res) => {
  const newDestination = req.body;

  const db = client.db("travel_destination")
  const tdCollection = db.collection("destinations")
  const result = await tdCollection.insertOne(newDestination)
  res.status(201).send(`A document was inserted with the _id: ${result.insertedId}`);
});



/* const destinations = [ {
country: "Italy",
link: "https://www.lonelyplanet.com/italy",
title: "Italy",
description: "Italy is a country located in Southern Europe comprising the boot-shaped Italian peninsula and a number of islands including Sicily and Sardinia.",
arrivalDate: "2018-04-01",
departureDate: "2018-04-14",
// image: "https://www.telegraph.co.uk/content/dam/Travel/Destinations/Europe/Italy/italy-attractions.jpg?imwidth=450"
    }]   */