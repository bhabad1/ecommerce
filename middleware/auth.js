const jwt = require("jsonwebtoken");
const config = require("../config.json");

let verifyToken = (req, res, next) => {
  try {
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }
    if (token) {
      //console.log(token);
      jwt.verify(token, config.jwt_secrete, (err, decoded) => {
        if (err) {
          return res.status(401).json({
            status: "failed",
            msg: "Token is Not Valid",
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(401).json({
        status: "failed",
        msg: "Auth Token Not Provided",
      });
    }
  } catch (error) {
    return res.status(401).json({
      status: "failed",
      msg: "Auth Token Not Provided",
      error: error,
    });
  }
};

module.exports = verifyToken;
