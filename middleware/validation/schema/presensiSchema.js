const { body } = require("express-validator");

const createPresensiSchema = [
  body("nama").notEmpty().withMessage("nama tidak boleh kosong"),
  body("discordId")
    .notEmpty()
    .withMessage("DiscordID tidak boleh kosong")
    .isLength({ min: 18, max: 18 })
    .withMessage("Discord ID harus 18 karakter"),
  body("status").notEmpty().withMessage("status tidak boleh kosong"),
  body("studyGroupId")
    .notEmpty()
    .withMessage("ID studygroup tidak boleh kosong"),
];

const updatePresensiSchema = [
  body("nama").notEmpty().withMessage("nama tidak boleh kosong").optional(),
  body("discordId")
    .notEmpty()
    .withMessage("DiscordID tidak boleh kosong")
    .isLength({ min: 18, max: 18 })
    .withMessage("Discord ID harus 18 karakter")
    .optional(),
  body("status").notEmpty().withMessage("status tidak boleh kosong").optional(),
];

module.exports = {
  createPresensiSchema,
  updatePresensiSchema,
};
