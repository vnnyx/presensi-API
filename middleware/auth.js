const jwt = require("jsonwebtoken");
const db = require("../models");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.rest.unauthorized("Authentikasi Gagal");

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
    if (err) return res.rest.unauthorized("Authentikasi Gagal");

    const userToken = await db.Token.findOne({
      where: { token, userId: user.id },
    });
    if (!userToken) return res.rest.unauthorized("Token tidak sesuai");

    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
