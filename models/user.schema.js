const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { error } = require("../init/logger");
require("dotenv").config();

const UserSchema = mongoose.Schema;
// Schema
const userSchema = new UserSchema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.userEmailValidation = async function userEmailValidation(
  userMail
) {
  return this.constructor.findOne({ email: userMail });
};

userSchema.methods.generateAuthToken = function generateAuthToken() {
  return jwt.sign({ _id: this._id.toString() }, process.env.TOKEN_KEY);
};

userSchema.methods.verifyUserToken = async function verifyUserToken(req) {
  const authHeader = req.headers.authorization;
  console.log(req.headers, process.env.TOKEN_KEY)
  const verifyToken = jwt.verify(authHeader, process.env.TOKEN_KEY);
  console.log(verifyToken)
  return this.constructor.findOne({ _id: verifyToken._id });
};

userSchema.methods.userPasswordCompare = function userPasswordCompare(
  password
) {
  return bcrypt.compare(password, this.password);
};

userSchema.statics.encryptPassword = (password) => bcrypt.hash(password, 10);

userSchema.pre("save", function (next) {
  const user = this;
  if (this.isModified("password") || this.isNew) {
    userSchema.statics
      .encryptPassword(user.password)
      .then(function (password) {
        user.password = password;
        next();
      })
      .catch(next);
  } else {
    next();
  }
});

module.exports = mongoose.model("User", userSchema);
