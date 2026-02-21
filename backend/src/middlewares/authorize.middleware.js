/**
 * Authorization middleware factory
 * Creates middleware that checks if user has required role(s)
 * @param  {...string} allowedRoles - Roles allowed to access the route
 */
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to perform this action.'
      });
    }

    next();
  };
};

/**
 * Check if user is admin
 */
const isAdmin = authorize('admin');

/**
 * Check if user is admin or editor
 */
const isAdminOrEditor = authorize('admin', 'editor');

/**
 * Check if user owns resource or is admin
 * @param {Function} getResourceOwnerId - Function to get resource owner ID from request
 */
const isOwnerOrAdmin = (getResourceOwnerId) => {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.'
      });
    }

    if (req.user.role === 'admin') {
      return next();
    }

    try {
      const ownerId = await getResourceOwnerId(req);
      
      if (ownerId === req.user.id) {
        return next();
      }

      return res.status(403).json({
        success: false,
        message: 'You do not have permission to perform this action.'
      });
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  authorize,
  isAdmin,
  isAdminOrEditor,
  isOwnerOrAdmin
};
