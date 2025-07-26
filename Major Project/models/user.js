const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema; // bar bar na likhna pry
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  
  email: {
    type: String,
    required: true,
    unique: true
  },
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: "email" // by default user se login krta is liy chnage kia
});




module.exports = mongoose.model("User", userSchema)
