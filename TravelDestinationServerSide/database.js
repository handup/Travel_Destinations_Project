import mongoose from "mongoose";

const hostname = "127.0.0.1";
const dbName = "travel_destination";
const uri = `mongodb://${hostname}:27017/${dbName}`;

export const db = await mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });