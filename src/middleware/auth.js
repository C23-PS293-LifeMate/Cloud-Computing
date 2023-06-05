const jwt = require("jsonwebtoken");
const secretKey = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N";

async function generateToken(idUser) {
    const payload = { idUser };
    const options = { expiresIn: "365d" };
    return jwt.sign(payload, secretKey, options);
  }

async function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(token, secretKey, (err, decoded)=> {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  });
}  
  module.exports = {
    generateToken,
    verifyToken
  };