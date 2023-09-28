const express = require("express");
const router = express.Router();
const transactionsController = require("../controllers/transactions.controllers");
const auth = require("../middlewares/auth");
const validation = require("../middlewares/validation");
const { transactionSchema } = require("../service/validation.service");

router.get("/", auth, transactionsController.get);

router.get("/categories/:category", auth, transactionsController.categories);

router.get("/stats/:year", auth, transactionsController.yearStats);

router.get("/stats/:year/:month", auth, transactionsController.monthStats);

router.post(
  "/",
  auth,
  validation(transactionSchema),
  transactionsController.create
);

module.exports = router;
