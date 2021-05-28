const express = require("express");
const router = express.Router();
// const {authenticateToken, permit} = require('../middleware/auth')

const { createStudyGroup, getAllStudyGroup, updateStudyGroup, deleteStudyGroup, spesificStudyGroup} = require("../controllers/studyGroupController")

router.get('/', getAllStudyGroup)
router.post('/' , createStudyGroup)
router.put('/:id', updateStudyGroup)
router.delete('/:id', deleteStudyGroup)
router.get('/:id', spesificStudyGroup)

module.exports = router