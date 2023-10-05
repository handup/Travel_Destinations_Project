import { getDestinations, createDestination } from './data_layer.js';
import express from 'express'
import cors from 'cors'

const app = express();

const port = 3000;
app.use(express.json({limit: '10mb'}))
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
app.get('/destinations', async (_, res) => await getDestinations().then(result => res.send(result)).catch(err=>console.log(err)));

// POST localhost:40000/destinations => add a new destination
app.post('/destinations', async (req, res) =>
  await createDestination(req.body)
  .then(result => res.status(201).send(`A document was inserted with the _id: ${result.insertedId}`))
  .catch(err=> console.log(err)))
