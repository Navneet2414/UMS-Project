const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const objectId = mongoose.Types.ObjectId;
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    Unique: true,
  },
  mobile: {
    type: Number,
    required: false,
  },
  pasword: {
    type: String,
    requird: false,
  },
  accessToken: {
    type: String,
    default: " ",
  },
  is_admin: {
    type: Number,
    required: true,
  },
  is_verified: {
    type: Number,
    default: 0,
  },
  otpCode: {
    type: Number,
    default: " ",
    required: true,
  },
  Language:{
    type:[{}],
    default:[{}],
  
  },
  // categories: {
  //   type: String,
  //   // required: false,
    
  // },
});
UserSchema.methods.setPassword = function (pasword, callback) {
  const promise = new Promise((resolve, reject) => {
    if (!password) reject(new Error("Missing Password"));

    bcrypt.hash(pasword, 10, (err, hash) => {
      if (err) reject(err);
      this.pasword = hash;
      resolve(this);
    });
  });

  if (typeof callback !== "function") return promise;
  promise
    .then((result) => callback(null, result))
    .catch((err) => callback(err));
};
UserSchema.methods.authenticate = function (pasword, callback) {
  const promise = new Promise((resolve, reject) => {
    if (!pasword) reject(new Error("MISSING_PASSWORD"));

    bcrypt.compare(pasword, this.pasword, (error, result) => {
      if (!result) reject(new Error("INVALID_PASSWORD"));
      resolve(this);
    });
  });
  if (typeof callback !== "function") return promise;
  promise
    .then((result) => callback(null, result))
    .catch((err) => callback(err));
};

module.exports = mongoose.model("User", UserSchema);
