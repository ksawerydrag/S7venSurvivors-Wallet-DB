const Transaction = require("../models/transaction.model");

const getTransactions = async (query) => {
  return Transaction.find(query);
};

const createTransaction = async (body) => {
  return Transaction.create(body);
};

module.exports = {
  getTransactions,
  createTransaction,
};
