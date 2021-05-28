const db = require("../models");

const createStudyGroup = (req, res) => {
  db.studyGroup.create(req.body)
    .then(() => {
      res.rest.success("Komentar telah dipost");
    })
    .catch((err) => {
      res.rest.badRequest("Gagal menambah komentar");
    });
};

// const deleteComment = async (req, res, next) => {
//   try {
//     let comment = await db.Comment.findOne({ where: { id: req.params.id } });
//     if (!comment) return res.rest.badRequest("Komentar tidak ditemukan");
//     if (comment.penulis != req.user.id && req.user.role != "admin") {
//       return res.rest.badRequest("Anda tidak dapat menghapus komentar ini !");
//     }
//     await comment.destroy();
//     res.rest.success("Komentar berhasil di delete");
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = {
  createStudyGroup,
  // deleteComment,
};