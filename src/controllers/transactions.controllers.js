const Transaction = require("../models/transaction.model");
const {
  getTransactions,
  createTransaction,
} = require("../service/transactions.service");

const get = async (req, res, next) => {
  try {
    const { query, user } = req;
    const transactions = await Transaction.find({
      ...query,
      owner: user._id,
    });
    if (transactions.length === 0) {
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
    next(error);
  }
};

const categories = async (req, res) => {
  try {
    const { user } = req;
    let { category } = req.params;
    category = category.replace(/ /g, "-");
    const smallLetter = category.charAt(0).toLowerCase();
    const restOfString = category.slice(1);
    category = smallLetter + restOfString;
    const capLetter = category.charAt(0).toUpperCase();
    const originalLetters = capLetter + restOfString;
    const original = originalLetters.replace(/-/g, " ");
    const transactions = await Transaction.find({
      category: original,
      owner: user._id,
    });
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
    return res.status(500).json({
      status: "Internal Server Error",
      message: error.message,
    });
  }
};

const yearStats = async (req, res) => {
  try {
    const { user } = req;
    const { year } = req.params;
    if (isNaN(year)) {
      return res.status(400).json({
        status: "Bad Request",
        message: "Invalid year.",
      });
    }
    const yearInt = parseInt(year, 10);
    const startDate = new Date(yearInt, 0, 1);
    const endDate = new Date(yearInt, 11, 31);
    const transactions = await Transaction.find({
      date: {
        $gte: startDate,
        $lte: endDate,
      },
      owner: user._id,
    });
    if (transactions.length === 0) {
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

const monthStats = async (req, res) => {
  try {
    const { user } = req;
    const { year, month } = req.params;
    if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
      return res.status(400).json({
        status: "Bad Request",
        message: "Invalid year or month.",
      });
    }
    const yearInt = parseInt(year, 10);
    const monthInt = parseInt(month, 10);
    const formattedMonth = monthInt.toString().padStart(2, "0");
    const startDate = new Date(`${yearInt}-${formattedMonth}-01`);
    const nextMonth = monthInt === 12 ? 1 : monthInt + 1;
    const nextYear = monthInt === 12 ? yearInt + 1 : yearInt;
    const endDate = new Date(
      `${nextYear}-${nextMonth.toString().padStart(2, "0")}-01`
    );
    endDate.setDate(endDate.getDate() - 1);
    const transactions = await Transaction.find({
      date: {
        $gte: startDate,
        $lte: endDate,
      },
      owner: user._id,
    });
    if (transactions.length === 0) {
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

module.exports = {
  get,
  categories,
  yearStats,
  monthStats,
  create,
};
