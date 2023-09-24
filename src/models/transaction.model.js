const mongoose = require("mongoose");
const { Schema } = mongoose;

const transaction = new Schema(
  {
    date: {
      type: Date,
    },
    type: {
      type: Boolean,
      required: [true, "Type is required"],
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transaction, "transactions");
module.exports = Transaction;
