const { successResponse, errorResponse } = require('../../utils/response');
const jwt = require('jsonwebtoken');
const db = require('../../config/db.config');
const { generateAccessToken, generateRefreshToken } = require('../../utils/jwt');

const refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return errorResponse(res, 'No refresh token provided', 400);
    }

    // Kiểm tra refresh token trong cơ sở dữ liệu
    const sql = 'SELECT * FROM refresh_tokens WHERE token = ?';
    const [rows] = await db.query(sql, [refreshToken]);

    if (rows.length === 0) {
      return errorResponse(res, 'Invalid refresh token', 401);
    }

    const tokenData = rows[0];

    // Kiểm tra thời hạn của refresh token
    if (new Date() > new Date(tokenData.expires_At)) {
      return errorResponse(res, 'Refresh token expired', 401);
    }

    // Lấy thông tin người dùng từ bảng users
    const userSql = 'SELECT * FROM users WHERE user_id = ?';
    const [userRows] = await db.query(userSql, [tokenData.user_id]);

    if (userRows.length === 0) {
      return errorResponse(res, 'User not found', 404);
    }

    const user = userRows[0];
    console.log('User for refresh:', user);
    // return
    // Format user info
    const userInfo = {
      id: user.user_id,
      email: user.email,
      user_name: user.user_name,
      avatar: user.avatar,
      role: user.user_role,
      avatar: user.avatar_link,
    };

    // Tạo mới access token và refresh token
    const newAccessToken = generateAccessToken({
      id: user.user_id,
      email: user.email,
      user_name: user.user_name,
      role: user.user_role,
    });
    const newRefreshToken = await generateRefreshToken(user.user_id);

    // Xóa refresh token cũ
    const deleteSql = 'DELETE FROM refresh_tokens WHERE token = ?';
    await db.query(deleteSql, [refreshToken]);

    // Set cookie cho refresh token mới
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
      path: '/api/auth',
    });
    successResponse(
      res,
      { userInfo, accessToken: newAccessToken },
      200,
      'Token refreshed successfully'
    );
  } catch (error) {
    console.error('Refresh token error:', error);
    errorResponse(res, 'Internal Server Error', 500);
  }
};

module.exports = { refresh };
