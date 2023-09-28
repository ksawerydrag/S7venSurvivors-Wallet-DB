const Joi = require("joi");

const idSchema = Joi.object({
  id: Joi.string().length(24).required(),
});

const {
  getTransactions,
  // getCategories,
  // getMore,
  createTransaction,
} = require("../service/transactions.service");

const get = async (req, res, next) => {
  try {
    const { query, user } = req;
    const transactions = await getTransactions({
      ...query,
      owner: user._id,
    });
    res.status(200).json({
      status: "OK",
      data: {
        transactions: transactions,
      },
    });
  } catch (error) {
    next(error);
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
    next(error);
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
