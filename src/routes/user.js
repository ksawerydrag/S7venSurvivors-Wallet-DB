const express = require("express");
const router = express.Router();
const { validation } = require("../middlewares");
const { joiSignupSchema } = require("../models/userModel");
const userTask = require("../controller/userController");

router.post("/signup", validation(joiSignupSchema), userTask.signUp);