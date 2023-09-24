const express = require("express");
const router = express.Router();
const transactionsController = require("../../controllers/transactions.controllers");
const auth = require("../../middlewares/auth");

router.get("/", auth, transactionsController.getTransactions);

router.get("/categories", auth, transactionsController.getCategories);

router.get("/stats", auth, transactionsController.getMore);

router.post("/", auth, transactionsController.createTransaction);

module.exports = router;