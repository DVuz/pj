const { successResponse, errorResponse } = require('../../utils/response');
const db = require('../../config/db.config');
const jwt = require('jsonwebtoken');

const logout = async (req, res) => {
  try {
    //đọc refresh token từ cookie
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return errorResponse(res, 'No refresh token provided', 400);
    }

    // Xóa refresh token khỏi cơ sở dữ liệu
    const deleteTokenQuery = 'DELETE FROM refresh_tokens WHERE token = ?';
    await db.query(deleteTokenQuery, [refreshToken]);

    // Xóa cookie refresh token
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      path: ' /api/auth',
    });

    successResponse(res, {}, 200, 'Logout successful');
  } catch (error) {
    console.error('Logout error:', error);
    errorResponse(res, 'Internal Server Error', 500);
  }
};

module.exports = { logout };
