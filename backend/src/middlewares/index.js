const { authenticate, optionalAuth } = require('./auth.middleware');
const { authorize, isAdmin, isAdminOrEditor, isOwnerOrAdmin } = require('./authorize.middleware');
const errorHandler = require('./errorHandler');

module.exports = {
  authenticate,
  optionalAuth,
  authorize,
  isAdmin,
  isAdminOrEditor,
  isOwnerOrAdmin,
  errorHandler
};
