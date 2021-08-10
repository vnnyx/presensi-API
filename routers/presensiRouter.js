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

router.get("/all", authenticateToken, getAllPresensi);
router.post(
  "/",
  authenticateToken,
  validate(createPresensiSchema),
  createPresensi
);
router.put(
  "/:id",
  authenticateToken,
  validate(updatePresensiSchema),
  updatePresensi
);
router.delete("/:id", authenticateToken, deletePresensi);
router.get("/:id", authenticateToken, spesificPresensi);

module.exports = router;
