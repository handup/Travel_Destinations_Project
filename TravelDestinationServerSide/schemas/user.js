import { db } from '../database.js'

const userSchema = new db.Schema({
  email: { type: String },
  password: { type: String },
});

export const User = db.model("users", userSchema);
export const createUser = (newUser) => new User(newUser).save();
