const { successResponse, errorResponse } = require('../../utils/response');
const { hassPassword, comparePassword } = require('../../utils/hashPassword');
const jwt = require('jsonwebtoken');
const db = require('../../config/db.config');
const { generateAccessToken, generateRefreshToken } = require('../../utils/jwt');
const Joi = require('joi');

// Validation schema
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$'))
    .required()
    .messages({
      'string.pattern.base':
        'Password must contain at least one uppercase letter, one lowercase letter, and one digit',
      'string.min': 'Password must be at least 8 characters long',
    }),
});

const login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return errorResponse(res, error.details[0].message, 400);
    }

    const { email, password } = req.body;
    console.log('Login attempt for email:', email);

    const sql = 'select * from users where email = ?';
    const [rows] = await db.query(sql, [email]);

    if (rows.length === 0) {
      return errorResponse(res, 'Invalid email or password', 401);
    }
    const password_query = 'select * from userauthentication where user_id = ?';
    const [password_rows] = await db.query(password_query, [rows[0].user_id]);

    const user = rows[0];
    console.log('User found:', user);

    const isPasswordValid = await comparePassword(password, password_rows[0].password);
    if (!isPasswordValid) {
      return errorResponse(res, 'Invalid email or password', 401);
    }

    // Generate tokens
    const accessToken = generateAccessToken({
      id: user.user_id,
      email: user.email,
      user_name: user.user_name,
      role: user.user_role,
    });
    console.log('AccessToken payload:', {
      id: user.user_id,
      email: user.email,
      user_name: user.user_name,
      role: user.user_role,
    });
    console.log('Generated Access Token:', accessToken);
    const refreshToken = await generateRefreshToken(user.user_id);

    // format user info
    const userInfo = {
      id: user.user_id,
      email: user.email,
      user_name: user.user_name,
      avatar: user.avatar,
      role: user.user_role,
      avatar: user.avatar_link,
    };

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true in production
      sameSite: 'Lax',
      maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
      path: '/api/auth',
    });
    successResponse(res, { userInfo: userInfo, accessToken }, 200, 'Login successful');
  } catch (error) {
    console.error('Login error:', error);
    errorResponse(res, 'Internal Server Error', 500);
  }
};
module.exports = { login };
