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
    return res.status(13).json({msg: 'Authorization forbidden'});
  }
}

async function checkMember(req, res, NextFunction) {
  const token = req.header('Authorization').split(" ")[1];

  if(!token) return res.status(400);

  try {
    const decode = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
    req.decodedId = decode.id;
    const member = await Member.findOne(decodedId);
    if (member.role === MEMBER_ROLE.MEMBER) {
      NextFunction();
    } else {
      return res.status(14).json({msg: "Required member permission"});
    }
    
  } catch (err) {
    console.error(err);
    return res.status(13).json({msg: 'Authorization forbidden'});
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
      return res.status(14).json({msg: "Required admin permission"});
    }
    
  } catch (err) {
    console.error(err);
    return res.status(13).json({msg: 'Authorization forbidden'});
  }
}

module.exports = verifyToken
