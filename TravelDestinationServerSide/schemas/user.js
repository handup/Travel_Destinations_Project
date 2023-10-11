import { db } from "../database.js";

import passportLocalMongoose from "passport-local-mongoose";
import { ObjectId } from "mongodb";

const userSchema = new db.Schema({
  email: { type: String },
  password: { type: String },
}); //WHY WAS THIS EMPTY?

userSchema.plugin(passportLocalMongoose);

export const User = db.model("users", userSchema);

export const getUser = (id) => User.findById(id)
export const createUser = (newUser) => new User(newUser).save();
