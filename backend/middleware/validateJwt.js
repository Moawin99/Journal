const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {} next
 * @description extracts token from header and validates it. If it's valid the user is set, if not a 403 is returned
 */
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = authenticateJWT;
