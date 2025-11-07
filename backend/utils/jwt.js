const jwt = require('jsonwebtoken');
const db = require('../config/db.config');
const uuid = require('uuid');

const jwt_access = process.env.JWT_SECRET;

const generateAccessToken = payload => {
  return jwt.sign(payload, jwt_access, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m' });
};
const generateRefreshToken = async user_id => {
  const refreshToken = uuid.v4();
  const expiryDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // 14 days

  // Store refresh token in database
  const sql = 'INSERT INTO refresh_tokens (user_id, token, expires_At) VALUES (?, ?, ?)';
  await db.query(sql, [user_id, refreshToken, expiryDate]);

  return refreshToken;
};

const verifyAccessToken = token => {
  try {
    console.log('Verifying token with secret:', jwt_access);
    const decoded = jwt.verify(token, jwt_access);
    console.log(decoded);
    return decoded;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.error('Token expired:', error);
      return { expired: true };
    }
    console.error('Token verification failed:', error);
    return null;
  }
};
module.exports = { generateAccessToken, generateRefreshToken, verifyAccessToken };
