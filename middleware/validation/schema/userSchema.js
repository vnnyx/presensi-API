const { body } = require("express-validator");
const { findOneByUsername } = require("../../../controllers/userController");

const createUserSchema = [
  body("username")
    .notEmpty()
    .withMessage("username tidak boleh kosong")
    .custom(async (value) => {
      return findOneByUsername(value).then((user) => {
        if (user) {
          return Promise.reject("username sudah digunakan");
        }
      });
    }),
  body("fullName").notEmpty().withMessage("fullName tidak boleh kosong"),
  body("password")
    .notEmpty()
    .withMessage("password tidak boleh kosong")
    .isLength({ min: 8 })
    .withMessage("Password minimal 8 karakter"),
];

const loginUserSchema = [
  body("username")
    .notEmpty()
    .withMessage("username tidak boleh kosong")
    .custom(async (value) => {
      return findOneByUsername(value).then((user) => {
        if (!user) {
          return Promise.reject("username tidak ditemukan");
        }
      });
    }),
  body("password")
    .notEmpty()
    .withMessage("password tidak boleh kosong")
    .isLength({ min: 8 })
    .withMessage("Password minimal 8 karakter"),
];

module.exports = {
  createUserSchema,
  loginUserSchema,
};
