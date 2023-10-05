import mongoose from "mongoose"


const hostname = '127.0.0.1';
// by default it will go to test database and to avoid it I specified the name of the database
const dbName = 'travel_destinations';
const uri = `mongodb://${hostname}:27017/${dbName}`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

const destinationSchema = new mongoose.Schema({
  country: {
    type: String,
    minLength: [3, 'Too short '],
    required: true
  },
  link:{
    type: String,
    required: true
  },
  title: {
    type: String,
    minLength: [3, 'Too short'],
    required: true
  },
  description: String,
  arrivalDate: {
    type: Date,
    required: true
  },
  departureDate: {
    type: Date,
    required: true
  },
  image: String,
});


  
export const Destination = mongoose.model('destinations', destinationSchema);
export const getDestinations = () => Destination.find()
export const createDestination = (newDestination) => new Destination(newDestination).save();
export const deleteDestination = (id) => Destination.findByIdAndDelete(id)
export const updateDestination = (id, newDestination) => Destination.findByIdAndUpdate(id, newDestination)
