const jwt = require("jsonwebtoken");
const NextFunction = require("express")
const MEMBER_ROLE = require("../models/Member")

async function verifyToken(req, res, NextFunction) {
  const token = req.header('Authorization').split(" ")[1];

  if(!token) return res.status(400);

  try {
    const decode = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
    req.decodedId = decode.id;
    NextFunction();
  } catch (err) {
    console.error(err);
    return res.status(403).json({errorCode: "13", msg: 'Authorization forbidden'});
  }
}

async function checkMember(req, res, NextFunction) {
  const token = req.header('Authorization').split(" ")[1];

  if(!token) return res.status(400);

  try {
    const decode = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
<<<<<<< Updated upstream
    req.decodedId = decode.id;
    const member = await Member.findOne(decodedId);
    if (member.role === MEMBER_ROLE.MEMBER) {
=======
    const decodedId = decode.id;

    const member = await Member.findById(decodedId);
    if (member.role === "MEMBER" || member.role === "ADMIN") {
>>>>>>> Stashed changes
      NextFunction();
    } else {
      return res.status(403).json({errorCode: "14", msg: "Required member permission"});
    }
    
  } catch (err) {
    console.error(err);
    return res.status(403).json({errorCode: "13", msg: 'Authorization forbidden'});
  }
}

async function checkAdmin(req, res, NextFunction) {
  const token = req.header('Authorization').split(" ")[1];

  if(!token) return res.status(400);

  try {
    const decode = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
    req.decodedId = decode.id;
    const admin = await Member.findOne(decodedId);
    if (admin.role === MEMBER_ROLE.ADMIN) {
      NextFunction();
    } else {
      return res.status(403).json({errorCode: "15", msg: "Required admin permission"});
    }
    
  } catch (err) {
    console.error(err);
    return res.status(403).json({errorCode: "13", msg: 'Authorization forbidden'});
  }
}

module.exports = verifyToken
