const { body } = require("express-validator");

const createStudyGroupSchema = [
  body("judul").notEmpty().withMessage("judul tidak boleh kosong"),
  body("tanggal").notEmpty().withMessage("tanggal tidak boleh kosong"),
  body("penutor").notEmpty().withMessage("penutor tidak boleh kosong"),
  body("divisi").notEmpty().withMessage("divisi tidak boleh kosong"),
  body("tempat").notEmpty().withMessage("Masukkan tempat study group"),
  body("deskripsi").notEmpty().withMessage("deskripsi tidak boleh kosong"),
];

const updateStudyGroupSchema = [
  body("judul").notEmpty().withMessage("judul tidak boleh kosong").optional(),
  body("tanggal")
    .notEmpty()
    .withMessage("tanggal tidak boleh kosong")
    .optional(),
  body("penutor")
    .notEmpty()
    .withMessage("penutor tidak boleh kosong")
    .optional(),
  body("divisi").notEmpty().withMessage("divisi tidak boleh kosong").optional(),
  body("tempat")
    .notEmpty()
    .withMessage("Masukkan tempat study group")
    .optional(),
  body("deskripsi")
    .notEmpty()
    .withMessage("deskripsi tidak boleh kosong")
    .optional(),
];

const findStudyGroupSchema = [
  body("tanggal").notEmpty().withMessage("tanggal tidak boleh kosong"),
];

module.exports = {
  createStudyGroupSchema,
  updateStudyGroupSchema,
  findStudyGroupSchema,
};
