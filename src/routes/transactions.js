const express = require("express");
const router = express.Router();
const transactionsController = require("../controllers/transactions.controllers");
const auth = require("../middlewares/auth");

router.get("/", auth, transactionsController.get);

router.get("/categories", auth, transactionsController.categories);

router.get("/stats", auth, transactionsController.stats);

router.post("/", auth, transactionsController.create);

module.exports = router;
