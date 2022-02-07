const joi = require("joi");

const postTutorialSchema = joi.object({
  title: joi.string().min(3).max(150).required(),
  description: joi.string().min(1).max(500).required(),
  published: joi.boolean().required(),
});

module.exports = {
  postTutorialSchema,
};
