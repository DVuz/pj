const { verifyAccessToken } = require('../utils/jwt');
const { successResponse, errorResponse } = require('../utils/response');

// Định nghĩa phân cấp vai trò
const ROLE_HIERARCHY = {
  Customer: 1,
  Shipper: 2,
  Admin: 3,
};

const authMiddleware = (requiredRole = 'Customer') => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers['authorization'];
      if (!authHeader) {
        return errorResponse(res, {}, 401, 'No token provided');
      }

      const token = authHeader.split(' ')[1];
      console.log('Token before verify:', token);
      const decoded = verifyAccessToken(token);
      console.log('Decoded Token:', decoded);

      // Check if token is expired
      if (decoded && decoded.expired) {
        return errorResponse(res, {}, 401, 'Token expired');
      }

      // Check if token is invalid
      if (!decoded) {
        return errorResponse(res, {}, 401, 'Invalid token');
      }

      req.user = decoded;

      // Role-based access control với phân cấp
      const userRoleLevel = ROLE_HIERARCHY[decoded.role] || 0;
      const requiredRoleLevel = ROLE_HIERARCHY[requiredRole] || 0;

      if (userRoleLevel < requiredRoleLevel) {
        return errorResponse(res, {}, 403, 'Forbidden: Insufficient permissions');
      }

      next();
    } catch (error) {
      return errorResponse(res, {}, 401, 'Invalid token');
    }
  };
};

module.exports = authMiddleware;
