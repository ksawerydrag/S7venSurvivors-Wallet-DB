const express = require("express");
const app = express();

const authRouter = require("./routes/auth");
const transactionsRouter = require("./routes/transactions");

app.use(express.json());
require("./config/passport");

app.use("/auth/users", authRouter);
app.use("/transactions", transactionsRouter);

app.use((err, _, res, _) => {
  res.status(404).json({
    status: "Not Found",
    message: err.message,
  });
});

app.use((err, _, res, _) => {
  res.status(500).json({
    status: "Internal Server Error",
    message: err.message,
  });
});

module.exports = app;
