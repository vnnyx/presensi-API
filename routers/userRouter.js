const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  getAllUsers,
} = require("../controllers/userController");
const { authenticateToken } = require("../middleware/auth");

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/all", authenticateToken, getAllUsers);

module.exports = router;
