const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/auth");

const {
  getAllPresensi,
  createPresensi,
  updatePresensi,
  deletePresensi,
  spesificPresensi,
} = require("../controllers/presensiController");

router.get("/", getAllPresensi);
router.post("/", createPresensi);
router.put("/:id", updatePresensi);
router.delete("/:id", deletePresensi);
router.get("/:id", spesificPresensi);

module.exports = router;
