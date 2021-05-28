const express = require("express");
const router = express.Router();
// const {authenticateToken, permit} = require('../middleware/auth')

const { createStudyGroup } = require("../controllers/studyGroupController")

router.post('/' , createStudyGroup)

module.exports = router