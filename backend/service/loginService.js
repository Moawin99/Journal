const jwt = require("jsonwebtoken");
const prisma = require("../config/prismaConfig");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findOne({
    where: {
      username: username,
    },
  });
  if (!user) {
    return res.status(401).send("User not found");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).send("Incorrect password");
  }
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.token("token", token);
  return res.sendStatus(200);
};

module.exports = login;
