const { body } = require("express-validator");

const createPresensiSchema = [
  body("nama").notEmpty().withMessage("nama tidak boleh kosong"),
  body("discordId")
    .notEmpty()
    .withMessage("DiscordID tidak boleh kosong")
    .isLength({ min: 18, max: 18 })
    .withMessage("Discord ID harus 18 karakter"),

  body("status").notEmpty().withMessage("status tidak boleh kosong"),
];

const updatePresensiSchema = [
  body("nama").notEmpty().withMessage("nama tidak boleh kosong"),
  body("discordId")
    .notEmpty()
    .withMessage("DiscordID tidak boleh kosong")
    .isLength({ min: 18, max: 18 })
    .withMessage("Discord ID harus 18 karakter"),

  body("status").notEmpty().withMessage("status tidak boleh kosong"),
];

module.exports = {
  createPresensiSchema,
  updatePresensiSchema,
};
