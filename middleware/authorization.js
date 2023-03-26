const jwt = require("jsonwebtoken");
const NextFunction = require("express")

async function verifyToken(req, res, NextFunction) {
  const token = req.header('Authorization').split(" ")[1];

  if(!token) return res.status(400);

  try {
    const decode = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
    req.decodedId = decode.id;
    NextFunction();
  } catch (err) {
    console.error(err);
    return res.status(403).json({msg: 'Authorization forbidden'});
  }
}

module.exports = verifyToken
