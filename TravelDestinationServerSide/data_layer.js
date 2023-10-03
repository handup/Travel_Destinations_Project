import mongoose from "mongoose"

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
  country: String,
  link: String,
  title: String,
  description: String,
  arrivalDate: String,
  departureDate: String,
  image: String,
});

const hostname = '127.0.0.1';
const uri = `mongodb://${hostname}:27017`;

  
export const Destination = mongoose.model('destinations', destinationSchema);
export const getDestinations = () => Destination.find()
export const createDestination = (newDestination) => new Destination(...newDestination).save()