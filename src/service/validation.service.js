const Joi = require("joi");

const signupSchema = Joi.object({
  username: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const transactionSchema = Joi.object({
  date: Joi.date().iso(),
  type: Joi.string()
    .valid("income", "expenditure")
    .required()
    .error(new Error("You should choose: income or expenditure")),
  category: Joi.string().required(),
  comment: Joi.string(),
  sum: Joi.number().required(),
  owner: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
});

module.exports = {
  signupSchema,
  loginSchema,
  transactionSchema
};
