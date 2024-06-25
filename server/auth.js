const express = require("express");
const mongoose = require("mongoose");

const User = require("./models/user");

const router = express.Router();

router.post("/signup", (req, res) => {
  User.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username: username }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("密码错误");
      }
    } else {
      res.json("找不到该用户");
    }
  });
});

module.exports = router;
