const express = require("express");
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();

const userRouter = require("./routes/user");
const transactionsRouter = require("./routes/transactions");

app.use(express.json());
require("./config/passport");

const options = {
  definition: {
    openapi: '5.0.0',
    info: {
      title: 'Wallet Application API',
      version: '1.0.0',
      description: 'Wallet Application API documentation',
    },
  },
  apis: ['./swagger/user.swagger.js', './swagger/transactions.swagger.js'],
};

const specs = swaggerJsdoc(options);

app.use("/api/users", userRouter, swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api/transactions", transactionsRouter, swaggerUi.serve, swaggerUi.setup(specs));

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
