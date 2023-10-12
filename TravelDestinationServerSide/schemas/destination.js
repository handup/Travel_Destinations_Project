import { db } from '../database.js'

const destinationSchema = new db.Schema({
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
  imageName: String,
});


  
export const Destination = db.model('destinations', destinationSchema);
export const getDestinations = () => Destination.find()
export const createDestination = (newDestination) => new Destination(newDestination).save();
export const deleteDestination = (id) => Destination.findByIdAndDelete(id)
export const updateDestination = (id, newDestination) => Destination.findByIdAndUpdate(id, newDestination)
