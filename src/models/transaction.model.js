const mongoose = require("mongoose");
const { Schema } = mongoose;

// Wstępny model transakcji, klucze i wymagania dot. wartości do zaktualizowania //

const transaction = new Schema(
  {
    firstKey: {
      type: String,
    },
    secondKey: {
      type: String,
    },
    thirdKey: {
      type: String,
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
