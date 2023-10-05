import mongoose from "mongoose";

const hostname = "127.0.0.1";
const dbName = "travel_destination";
const uri = `mongodb://${hostname}:27017/${dbName}`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const userSchema = new mongoose.Schema({
  email: { type: String },
  password: { type: String },
});

export const User = mongoose.model("users", userSchema);
export const createUser = (newUser) => new User(newUser).save();
