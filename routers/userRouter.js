const express = require("express");
const router = express.Router();
const {
} = require("../controllers/userController")
const { authenticateToken } = require("../middleware/auth");

router.post("/register", createUser);
router.post('/login', loginUser)
router.get('/allusers', authenticateToken, getAllUsers)
module.exports = router;

module.exports = router ;