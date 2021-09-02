const db = require("../models");
const { Op } = require("sequelize");

const createStudyGroup = (req, res) => {
  db.studyGroup
    .create(req.body)
    .then(() => {
      res.rest.success("Jadwal Study Group telah ditambahkan");
    })
    .catch((err) => {
      res.rest.badRequest("Jadwal gagal ditambahkan");
    });
};

const getAllStudyGroup = (req, res, next) => {
  db.studyGroup
    .findAll({
      attributes: [
        "id",
        "judul",
        "tanggal",
        "penutor",
        "divisi",
        "tempat",
        "deskripsi",
      ],
    })
    .then((data) => {
      res.rest.success({ message: "Get All StudyGroup Berhasil", data });
    })
    .catch((error) => {
      next(error);
    });
};

const updateStudyGroup = async (req, res, next) => {
  try {
    let sg = await db.studyGroup.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!sg) return res.rest.badRequest("Id not found");

    sg.update(req.body)
      .then((result) => {
        if (result) {
          return res.rest.success("Data telah terupdate");
        }
        return res.rest.badRequest("Data gagal diupdate");
      })
      .catch((err) => {
        res.rest.badRequest(err);
      });
  } catch (error) {
    next(error);
  }
};

const deleteStudyGroup = async (req, res, next) => {
  try {
    let sg = await db.studyGroup.findOne({
      where: { id: req.params.id },
    });

    if (!sg) return res.rest.badRequest("Jadwal Study Group tidak ditemukan");

    await sg.destroy();

    res.rest.success("Study Group berhasil di delete");
  } catch (error) {
    next(error);
  }
};

const spesificStudyGroup = async (req, res, next) => {
  try {
    const data = await db.studyGroup.findOne({
      attributes: [
        "id",
        "judul",
        "tanggal",
        "penutor",
        "divisi",
        "tempat",
        "deskripsi",
      ],
      where: { id: req.params.id },
    });

    if (!data)
      return res.rest.badRequest(
        `Jadwal study group dengan ID ${req.params.id} tidak ditemukan`
      );

    res.rest.success({ data });
  } catch (error) {
    next(error);
  }
};

const findStudyGroup = async (req, res, next) => {
  try {
    let tanggal = new Date(req.body.tanggal);
    let tanggal2 = new Date(req.body.tanggal);

    tanggal2.setDate(tanggal.getDate() + 1);

    const data = await db.studyGroup.findAll({
      where: {
        judul: { [Op.like]: `%${req.body.judul || ""}%` },
        penutor: { [Op.like]: `%${req.body.penutor || ""}%` },
        tanggal: {
          [Op.between]: [tanggal, tanggal2],
        },
      },
    });

    return res.rest.success({ message: "Find StudyGroup Berhasil", data });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createStudyGroup,
  getAllStudyGroup,
  updateStudyGroup,
  deleteStudyGroup,
  spesificStudyGroup,
  findStudyGroup,
};
