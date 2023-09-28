const mongoose = require("mongoose");
const { Schema } = mongoose;

const transaction = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    enum: ["income", "expenditure"],
    required: [true, "You should choose: income or expenditure"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
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
