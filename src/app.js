const express = require("express");
const app = express();

const userRouter = require("./routes/user");
const transactionsRouter = require("./routes/transactions");

app.use(express.json());
require("./config/passport");

app.use("/users", userRouter);
app.use("/transactions", transactionsRouter);

app.use((err, req, res, next) => {
  res.status(404).json({
    status: "Not Found",
    message: err.message,
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    status: "Internal Server Error",
    message: err.message,
  });
});

module.exports = app;
