const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");
const userRouter = express.Router();
require("dotenv").config();

userRouter.get("/", async (req, res) => {
  const newUser = await User.find();
  res.status(200).json({ msg: newUser });
});

userRouter.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    bcrypt.hash(password, 5, async (err, hash) => {
      const newUser = new User({ email: email, password: hash });
      await newUser.save();
    });
    res.status(200).send({ msg: "Regsitered Successfully" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ email: user.email }, "apple");
      bcrypt.compare(password, user.password, async (err, result) => {
        if (result) {
          res.status(200).send({ msg: "Login Successfull", token: token });
        } else {
          res.status(400).send({
            msg: "Wrong paassword",
            user: user,
            password: password,
            result,
          });
        }
      });
    } else {
      res.status(400).send("Registered first");
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = { userRouter };
