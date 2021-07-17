const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middleware/auth");

const {
  createUserSchema,
  loginUserSchema,
} = require("../middleware/validation/schema/userSchema");

const {
  createUser,
  loginUser,
  getAllUsers,
} = require("../controllers/userController");

const { validate } = require("../middleware/validation");

router.post("/register", validate(createUserSchema), createUser);
router.post("/login", validate(loginUserSchema), loginUser);
router.get("/all", authenticateToken, getAllUsers);

module.exports = router;
