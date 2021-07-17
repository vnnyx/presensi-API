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
const {
  createPresensiSchema,
  updatePresensiSchema,
} = require("../middleware/validation/schema/presensiSchema");
const { validate } = require("../middleware/validation");

router.get("/", getAllPresensi);
router.post("/", validate(createPresensiSchema), createPresensi);
router.put("/:id", validate(updatePresensiSchema), updatePresensi);
router.delete("/:id", deletePresensi);
router.get("/:id", spesificPresensi);

module.exports = router;
