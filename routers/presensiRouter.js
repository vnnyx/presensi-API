const express = require("express");
const router = express.Router();
const {authenticateToken, permit} = require('../middleware/auth')

const {} = require("../controllers/presensiController")

module.exports = router