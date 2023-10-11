import { getDestinations, createDestination, deleteDestination, updateDestination } from './schemas/destination.js';
import { User, getUser } from './schemas/user.js';
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import jwt from 'jsonwebtoken';
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as jwtStrategy, ExtractJwt as extractJwt} from 'passport-jwt'

const app = express();
const port = 3000;
// Increase the limit of the request payload to 10mb
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const secretKey = 'keyboard cat'

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: secretKey,
  cookie: { secure: true }
}))

// Passport
passport.use('local', new LocalStrategy(User.authenticate()));

passport.use('jwt', new jwtStrategy({
	jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey   : 'keyboard cat'
},
function (jwtPayload, cb) {

	//find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
	return getUser(jwtPayload.id)
		.then(user => {
			return cb(null, user);
		})
		.catch(err => {
			return cb(err);
		});
}
));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
	User.register(new User({ username: req.body.email }), req.body.password, function (err, user) { 
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

app.post("/login", (req, res, next) => { 
	
passport.authenticate('local', {session: false}, (err, user, info) => {
	if (err || !user) {
		return res.status(400).json({
			message: 'Something is not right',
			user   : user
		});
	}
   req.login(user, {session: false}, (err) => {
	   if (err) {
		   res.send(err);
	   }
	   // generate a signed son web token with the contents of user object and return it in the response
	   const token = jwt.sign({id: user.id}, 'keyboard cat');
	   return res.json({user, token});
	});
})(req, res);
}); 



// DELETE localhost:40000/destinations/:id => delete a destination
app.delete('/destinations/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const id = req.params.id;
  console.log("Thi is the id", id)
  await deleteDestination(id)
  .then(_ => res.status(200).send(`The document with the _id: ${id} was deleted`))
  .catch(err=> console.log(err))
});

// PUT localhost:40000/destinations/:id => update a destination
app.put('/destinations/:id', async (req, res) => {
  const id = req.params.id;
  console.log("Thi is the id", id)
  await updateDestination(id, req.body)
  .then(_ => res.status(200).send(`The document with the _id: ${id} was updated`))
  .catch(err=> console.log(err))
});