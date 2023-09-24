const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const signUp = async (req, res, next) => {
  const { username, email, password, token } = req.body;
  const user = await User.findByEmail(email);

  if (user) {
    return res.status(409).json({
      status: "Error",
      message: "Email is already in use",
      data: "Conflict",
    });
  }

  try {
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
      token,
    });

    res.status(201).json({
      status: "success",
      data: {
        newUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUp,
  // logIn,
  // logOut,
};
