//middleware for authenticating patients needed
const jwt = require("jsonwebtoken");
const secret = require("../../Secrets/secret");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Bad one!" });
      } else {
        if (decodedToken.type === "user") {
          req.username = decodedToken.username;
          next();
        } else {
          res.status(400).json({ message: "Wrong user type" });
        }
      }
    });
  } else {
    res.status(400).json({ message: "No credentials provided" });
  }
};
