const jwt = require('jsonwebtoken');

const secret = 'tu_secreto_secreto';

function generateToken(data) {
  return jwt.sign(data, secret, { expiresIn: '1h' });
}

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    return null;
  }
}

module.exports = { generateToken, verifyToken };
