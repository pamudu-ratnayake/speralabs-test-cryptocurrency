// import bcrypt from "bcryptjs";
// import  jwt from "jsonwebtoken";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

let UserAuthModel = require("../../models/auth/user");

const secret = process.env.JWT_SECRET;

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserAuthModel.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "2h",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await UserAuthModel.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserAuthModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

const getUser = (req, res, next) => {
  let _id = req.userId;
  UserAuthModel.findById(_id)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
    });
};

const addFavoriteCoin = (req, res, next) => {
  let _id = req.userId;
  UserAuthModel.findById(_id)
    .then((user) => {
      user.favoriteCoins.push(req.body);
      UserAuthModel.findByIdAndUpdate(_id, user)
      .then(() => {
        res.status(200).send({ status: "Updated!" });
      })
      .catch((err) => {
        res.status(500).send({ status: "Error! Cannot Update!" });
        console.log(err.message);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const removeFavoriteCoin = (req, res, next) => {
  let _id = req.userId;
  UserAuthModel.findById(_id)
    .then((user) => {
      user.favoriteCoins = user.favoriteCoins.filter(item => item.id !== req.body.id);
      UserAuthModel.findByIdAndUpdate(_id, user)
      .then(() => {
        res.status(200).send({ status: "coin deleted!" });
      })
      .catch((err) => {
        res.status(500).send({ status: "Error! Cannot delete!" });
        console.log(err.message);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getFavoriteCoins = (req, res) => {
  let _id = req.userId;
  UserAuthModel.findById(_id)
    .then((user) => {
      res.json(user.favoriteCoins);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  login,
  signup,
  getUser,
  addFavoriteCoin,
  removeFavoriteCoin,
  getFavoriteCoins
};
