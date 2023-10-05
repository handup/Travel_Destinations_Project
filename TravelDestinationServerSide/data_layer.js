import mongoose from "mongoose"


const hostname = '127.0.0.1';
const uri = `mongodb://${hostname}:27017`;

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
    min: [3, 'Too short '],
    required: true
  },
  link:{
    type: mongoose.SchemaTypes.Url,
    required: true
  },
  title: {
    type: String,
    min: [3, 'Too short'],
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
export const createDestination = (newDestination) => new Destination(newDestination).save()