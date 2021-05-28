const db = require("../models");

const createPresensi = (req, res) => {
  db.presensi
    .create(req.body)
    .then(() => {
      res.rest.success("Presensi telah ditambahkan");
    })
    .catch((err) => {
      res.rest.badRequest("Presensi gagal ditambahkan");
    });
};

const getAllPresensi = (req, res, next) => {
  db.presensi
    .findAll({
      attributes: ["id", "nama", "status"],
    })
    .then((result) => {
      res.rest.success({ data: result });
    })
    .catch((error) => {
      next(error);
    });
};

const updatePresensi = async (req, res, next) => {
  try {
    let presensi = await db.presensi.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!presensi) return res.rest.badRequest("Id not found");
    presensi
      .update(req.body)
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

const deletePresensi = async (req, res, next) => {
  try {
    let presensi = await db.presensi.findOne({
      where: { id: req.params.id },
    });
    if (!presensi) return res.rest.badRequest("Presensi tidak ditemukan");
    await presensi.destroy();
    res.rest.success("Presensi berhasil di delete");
  } catch (error) {
    next(error);
  }
};

const spesificPresensi = async (req, res, next) => {
  try {
    const data = await db.presensi.findOne({
      attributes: ["nama", "status"],
      where: { id: req.params.id },
    });
    if (!data)
      return res.rest.badRequest(
        `Presensi dengan ID ${req.params.id} tidak ditemukan`
      );
    res.rest.success({ data });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPresensi,
  getAllPresensi,
  updatePresensi,
  deletePresensi,
  spesificPresensi,
};
