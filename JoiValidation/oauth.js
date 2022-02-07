const joi = require("joi");

const postOauthSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(8).max(20).required(),
});

const patchUserPasswordschema = joi.object({
  currentPassword: joi.string().min(8).max(20).required(),
  newPassword: joi.string().min(8).max(20).required(),
});

 module.exports = {
    postOauthSchema,
    patchUserPasswordschema
  };
