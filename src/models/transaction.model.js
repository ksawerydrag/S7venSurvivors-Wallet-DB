const mongoose = require("mongoose");
const { Schema } = mongoose;

const transaction = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    enum: ["+", "-"],
    required: [true, "You should choose type of transaction"],
  },
  category: {
    type: String,
    enum: [
      "Main expenses",
      "Products",
      "Car",
      "Self care",
      "Child care",
      "Household products",
      "Education",
      "Leisure",
      "Other expenses",
      "Entertainment",
    ],
    required: [true, "You should choose category"],
  },
  comment: {
    type: String,
  },
  sum: {
    type: Number,
    required: [true, "Sum is required"],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const Transaction = mongoose.model("Transaction", transaction, "transactions");
module.exports = Transaction;
