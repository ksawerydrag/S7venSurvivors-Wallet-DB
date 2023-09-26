const express = require("express");
const router = express.Router();
const validation = require("../middlewares/validation");
const {
  joiSignupSchema,
  joiLoginSchema,
} = require("../service/validation.service");
const auth = require("../middlewares/auth");
const userTask = require("../controllers/user.controllers");

router.post("/signup", validation(joiSignupSchema), userTask.signUp);

router.post("/login", validation(joiLoginSchema), userTask.logIn);

router.get("/logout", auth, userTask.logOut);

router.get("/about", auth, userTask.aboutUser);

module.exports = router;
