const Transaction = require("../models/transaction.model");

const Joi = require("joi");

const idSchema = Joi.object({
  id: Joi.string().length(24).required(),
});

const {
  getTransactions,
  createTransaction,
} = require("../service/transactions.service");
// const Transaction = require("../models/transaction.model");

const get = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    if (!transactions) {
      return res.status(404).json({
        status: "Not Found",
        message: "Transactions not found.",
      });
    }
    res.status(200).json({
      status: "OK",
      data: {
        transactions: transactions,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "Internal Server Error",
      message: error.message,
    });
  }
};

const create = async (req, res, next) => {
  try {
    const { body, user } = req;
    const newTransaction = await createTransaction({
      ...body,
      owner: user._id,
    });
    res.status(201).json({
      status: "Created",
      data: { transaction: newTransaction },
    });
  } catch (error) {
    return res.status(500).json({
      status: "Internal Server Error",
      message: error.message,
    });
  }
};

const categories = async (req, res) => {
  try {
    const { category } = req.params;
    console.log(category);
    const transactions = await getTransactions({ category });
    if (transactions.length === 0) {
      return res.status(404).json({
        status: "Not Found",
        message: "Transactions not found.",
      });
    }
    res.status(200).json({
      status: "OK",
      data: { transactions: transactions },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  get,
  categories,
  // stats,
  create,
};
