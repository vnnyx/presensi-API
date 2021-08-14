const db = require("../models");
const md5 = require("md5");
const jwt = require("jsonwebtoken");

const generateToken = async (id) => {
  const token = jwt.sign({ id: id }, process.env.TOKEN_SECRET);
  await db.Token.create({ userId: id, token });
  return token;
};

const createUser = (req, res, next) => {
  try {
    req.body.password = req.body.password
      ? md5(req.body.password)
      : req.body.password;

    db.User.create(req.body)
      .then((result) => {
        res.rest.success("Anda telah berhasil Mendaftar");
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
    .then(async (result) => {
      if (result) {
        res.rest.success({
          message: "Login Berhasil",
          data: { token: await generateToken(result.id) },
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
    attributes: ["id", "fullName", "Username", "status"],
  })
    .then((data) => {
      res.rest.success({ message: "Get All user berhasil", data: data });
    })
    .catch((error) => {
      next(error);
    });
};

const findOneByUsername = async (username) => {
  return await db.User.findOne({ where: { username: username } });
};

module.exports = { createUser, loginUser, getAllUsers, findOneByUsername };
