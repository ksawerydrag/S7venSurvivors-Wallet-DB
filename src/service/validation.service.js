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
    .valid("+", "-")
    .required()
    .error(new Error("You should choose type of transaction")),
  category: Joi.string()
    .valid(
      "Main expenses",
      "Products",
      "Car",
      "Self care",
      "Child care",
      "Household products",
      "Education",
      "Leisure",
      "Other expenses",
      "Entertainment"
    )
    .required()
    .error(new Error("You should choose category")),
  comment: Joi.string(),
  sum: Joi.number().required(),
  owner: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
});

module.exports = {
  signupSchema,
  loginSchema,
  transactionSchema,
};
