import { getDestinations, createDestination, deleteDestination, updateDestination } from './schemas/destination.js';
import { User } from './schemas/user.js';
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import { Strategy } from 'passport-local'

const app = express();
const port = 3000;
// Increase the limit of the request payload to 10mb
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'keyboard cat',
  cookie: { secure: true }
}))

// Passport
passport.use(new Strategy(User.authenticate()));

app.use(passport.initialize()); 
app.use(passport.session()); 

app.use(
  cors({
    origin: "*", // Replace '*' with the actual origin(s) in a production environment
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// GET localhost:40000/destinations => return all destinations
app.get(
  "/destinations",
  async (_, res) =>
    await getDestinations()
      .then((result) => res.send(result))
      .catch((err) => console.log(err))
);

// POST localhost:40000/destinations => add a new destination
app.post(
  "/destinations",
  async (req, res) =>
    await createDestination(req.body)
      .then((result) => res.status(201).send(`A document was inserted with the _id: ${result.insertedId}`))
      .catch((err) => console.log(err))
);

app.post("/register", (req, res) => { 
	User.register(new User({ email: req.body.email, username: req.body.email }), req.body.password, function (err, user) { 
		if (err) { 
			res.json({ success: false, message: "Your account could not be saved. Error: " + err }); 
		} 
		else { 
			req.login(user, (er) => { 
				if (er) { 
					res.json({ success: false, message: er }); 
				} 
				else { 
					res.json({ success: true, message: "Your account has been saved" }); 
				} 
			}); 
		} 
	}); 
}); 


// DELETE localhost:40000/destinations/:id => delete a destination
app.delete('/destinations/:id', async (req, res) => {
  const id = req.params.id;
  console.log("Thi is the id", id)
  await deleteDestination(id)
  .then(result => res.status(200).send(`The document with the _id: ${id} was deleted`))
  .catch(err=> console.log(err))
});

// PUT localhost:40000/destinations/:id => update a destination
app.put('/destinations/:id', async (req, res) => {
  const id = req.params.id;
  console.log("Thi is the id", id)
  await updateDestination(id, req.body)
  .then(result => res.status(200).send(`The document with the _id: ${id} was updated`))
  .catch(err=> console.log(err))
});