const jwt = require("jsonwebtoken");
const prisma = require("../config/prismaConfig");
const bcrypt = require("bcrypt");

const login = async (req) => {
  const { username, password } = req.body;
  const foundUser = await prisma.users.findUnique({
    where: {
      username,
    },
  });
  //throw new error with status code 404 if user not found
  if (!foundUser) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  const isMatch = await bcrypt.compare(password, foundUser.password);
  if (!isMatch) {
    const error = new Error("Password is incorrect");
    error.statusCode = 401;
    throw error;
  }
  return jwt.sign(foundUser, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

module.exports = login;
