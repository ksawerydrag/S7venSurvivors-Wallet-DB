const Transaction = require("../models/transaction.model");

const getTransactions = async (query) => {
  return Transaction.find(query);
};
