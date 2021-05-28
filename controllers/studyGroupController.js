const db = require("../models");

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
      attributes: ["id", "judul", "tanggal", "penutor", "tempat", "deskripsi"],
    })
    .then((result) => {
      res.rest.success({ data });
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
      attributes: ["id", "judul", "tanggal", "penutor", "tempat", "deskripsi"],
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

module.exports = {
  createStudyGroup,
  getAllStudyGroup,
  updateStudyGroup,
  deleteStudyGroup,
  spesificStudyGroup,
};
