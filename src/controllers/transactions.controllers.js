const Joi = require("joi");

const idSchema = Joi.object({
  id: Joi.string().length(24).required(),
});

const { getTransactions } = require("../service/transactions.service");
const Transaction = require("../models/transaction.model");

const get = async (req, res) => {
  try {
    const { query, user } = req;
    const transactions = await getTransactions({ ...query, owner: user._id });
    res.status(200).json({
      status: "OK",
      data: {
        transactions: transactions,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Internal Server Error",
      error: "Unknown error occurred.",
      message: error.message,
    });
  }
};
