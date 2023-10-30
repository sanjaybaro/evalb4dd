const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, "apple", async (err, decoded) => {
    if (decoded) {
      next();
    } else {
      res.status(400).send({ msg: "Login First" });
    }
  });
};
module.exports = auth;
