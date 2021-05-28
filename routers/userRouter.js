const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middleware/auth");
const {
  createUser,
  loginUser,
  getAllUsers,
} = require("../controllers/userController");

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/all", authenticateToken, getAllUsers);

module.exports = router;
