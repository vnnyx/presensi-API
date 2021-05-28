const db = require("../models");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const generateToken = (id, role) => {
  return jwt.sign({ id: id, role: role }, process.env.token_secret);
};

const createUser = (req, res, next) => {
  try {
    req.body.password = req.body.password
      ? md5(req.body.password)
      : req.body.password;
    db.User.create(req.body)
      .then((result) => {
        res.rest.success(result);
      })
      .catch((err) => {
        res.rest.badRequest(err);
      });
  } catch (error) {
    next(error);
  }
};

const loginUser = (req, res, next) => {
  let { username, password } = req.body;
  db.User.findOne({
    where: {
      username: username,
      password: md5(password),
    },
  })
    .then((result) => {
      if (result) {
        res.rest.success({
          token: generateToken(result.id, result.role),
        });
      } else {
        res.rest.badRequest("Username / password salah");
      }
    })
    .catch((error) => {
      next(error);
    });
};

const getAllUsers = (req, res, next) => {
  db.User.findAll({
    attributes: ["id", "fullName", "Username", "email", "role"],
  })
    .then((result) => {
      res.rest.success(result);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = { createUser, loginUser, getAllUsers };
