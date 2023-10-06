import { db } from '../database.js'

import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new db.Schema({});

userSchema.plugin(passportLocalMongoose)

export const User = db.model("users", userSchema);
export const createUser = (newUser) => new User(newUser).save();
