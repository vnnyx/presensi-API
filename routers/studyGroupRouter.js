const express = require("express");
const router = express.Router();
// const {authenticateToken, permit} = require('../middleware/auth')

const {
  createStudyGroup,
  getAllStudyGroup,
  updateStudyGroup,
  deleteStudyGroup,
  spesificStudyGroup,
} = require("../controllers/studyGroupController");
const { authenticateToken } = require("../middleware/auth");
const { validate } = require("../middleware/validation");
const {
  createStudyGroupSchema,
  updateStudyGroupSchema,
} = require("../middleware/validation/schema/studyGroupSchema");

router.get("/", authenticateToken, getAllStudyGroup);
router.post(
  "/",
  authenticateToken,
  validate(createStudyGroupSchema),
  createStudyGroup
);
router.put(
  "/:id",
  authenticateToken,
  validate(updateStudyGroupSchema),
  updateStudyGroup
);
router.delete("/:id", authenticateToken, deleteStudyGroup);
router.get("/:id", authenticateToken, spesificStudyGroup);

module.exports = router;
