const express = require('express');
const app = express();
const cors = require('cors'); // Import the 'cors' package

const port = 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

  app.use(cors({
    origin: '*', // Replace '*' with the actual origin(s) in a production environment
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));


// GET localhost:40000/destinations => return all destinations
app.get('/destinations', (req, res) => {    
    res.send(destinations);
});

// POST localhost:40000/destinations => add a new destination
app.post('/destinations', (req, res) => {
    const newDestination = req.body;
    destinations.push(newDestination);
    res.send(newDestination);
});



const destinations = [ {
country: "Italy",
link: "https://www.lonelyplanet.com/italy",
title: "Italy",
description: "Italy is a country located in Southern Europe comprising the boot-shaped Italian peninsula and a number of islands including Sicily and Sardinia.",
arrivalDate: "2018-04-01",
departureDate: "2018-04-14",
// image: "https://www.telegraph.co.uk/content/dam/Travel/Destinations/Europe/Italy/italy-attractions.jpg?imwidth=450"
    }]  