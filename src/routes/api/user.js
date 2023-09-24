const express = require("express");
const router = express.Router();
const { validation } = require("../middlewares");
const { joiSignupSchema } = require("../../models/user.model");
const userTask = require("../../controllers/user.controllers");

router.post("/signup", validation(joiSignupSchema), userTask.signUp);
