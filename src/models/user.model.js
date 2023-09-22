const mongoose = require("mongoose");
const { Schema } = mongoose;
const bCrypt = require("bcryptjs");

const user = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  token: {
    type: String,
    default: null,
  },
});

user.methods.setPassword = (password) => {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

user.methods.validPassword = (password) => {
  return bCrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", user, "users");
module.exports = User;
