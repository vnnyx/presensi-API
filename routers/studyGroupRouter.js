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
const { validate } = require("../middleware/validation");
const {
  createStudyGroupSchema,
  updateStudyGroupSchema,
} = require("../middleware/validation/schema/studyGroupSchema");

router.get("/", getAllStudyGroup);
router.post("/", validate(createStudyGroupSchema), createStudyGroup);
router.put("/:id", validate(updateStudyGroupSchema), updateStudyGroup);
router.delete("/:id", deleteStudyGroup);
router.get("/:id", spesificStudyGroup);

module.exports = router;
