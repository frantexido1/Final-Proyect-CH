const jwt = require("jsonwebtoken");

const PRIVATE_KEY = "jwtsecret";

const generateToken = (payload, expiresIn) => {
  const token = jwt.sign(payload, PRIVATE_KEY, { expiresIn });

  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, PRIVATE_KEY);
    return decoded;
  } catch (error) {
    return console.error("Eror al verificar el token ", error.message);
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
