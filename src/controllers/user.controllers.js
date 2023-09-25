const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email }).lean();
  if (user) {
    return res.status(409).json({
      status: "Conflict",
      message: "Email is already in use.",
    });
  }
  try {
    const newUser = new User({
      username,
      email,
    });
    newUser.setPassword(password);
    await newUser.save();
    res.status(201).json({
      status: "Created",
      message: "Registration successful.",
    });
  } catch (error) {
    res.status(500).json({
      status: "Internal Server Error",
      message: error.message,
    });
  }
};

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.validPassword(password)) {
      return res.status(400).json({
        status: "Bad request",
        message: "Incorrect login or password.",
      });
    }
    const payload = {
      id: user.id,
      username: user.username,
    };
    const secret = process.env.SECRET;
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });
    res.status(200).json({
      status: "OK",
      data: {
        token: token,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Internal Server Error",
      message: error.message,
    });
  }
};

// logOut

const aboutUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    await User.findOne({ email });
    res.status(200).json({
      status: "OK",
      data: {
        username: username,
        email: email,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Internal Server Error",
      message: error.message,
    });
  }
};

module.exports = {
  signUp,
  logIn,
  // logOut,
  aboutUser,
};
