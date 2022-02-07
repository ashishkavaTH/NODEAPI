const user = require("../models/user.schema");
const {
  postUserSchema,
  patchUserSchema,
} = require("../joivalidation/user");
const User = require("../models/user.schema");
const logger = require("../init/logger");

// user create
const createUser = async (req, res) => {
  try {
    const { error, value } = postUserSchema.validate(req.body);
  if (error) {
    return res.status(400).send({ message: error.message });
      }
      const user = new User(value);
      const userEmailVerify = await 
      user.userEmailValidation
      (value.email);
  if (userEmailVerify) {
      res.status(409).send({ message: "Email already registered" });
  } else {
      await user.save();
      res.status(201).send(user);
      }
  } catch (error) {
    logger.error("Could not create user: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
  return null;
};

const updateUser = async (req, res) => {
  console.log('hi')
  try {
    // const { error } = patchUserSchema.validate(req.body);
    // if (error) {
    //   return res.status(400).send({ message: error.message });
    // }
    const user = await User.findOne({ _id: req.params.id });
    if (user === null) {
      return res.status(404).send({ message: 'Tutorial not found' });
    }
    console.log(user)
    const verifyUser = await user.verifyUserToken(req);
    console.log(verifyUser)
    // const userEmailVerify = await user.userEmailValidation(user.email);
    // console.log(userEmailVerify)
    // if (verifyUser.id !== req.params.id) {
    //   res.status(400).send({ message: "Invalid id" });
    // } else if (userEmailVerify) {
    //   res.status(409).send({ message: "Email already registered" });
    //   return userEmailVerify;
    // } else {
      await User.findByIdAndUpdate({ _id: req.params.id }, req.body);
      res.status(204).send({ message: "User updated" });
    //}
  } catch (error) {
      logger.error("Couldn't update a user", error);
      res.status(500).send({ message: "Internal Server Error" });
  }
  return null;
};

module.exports = {
  createUser,
  updateUser,
};
