const { userService } = require('../services');

class UserController {
  /**
   * Get all users (admin only)
   * GET /api/users
   */
  async getAllUsers(req, res, next) {
    try {
      const options = {
        page: req.query.page,
        limit: req.query.limit,
        role: req.query.role,
        isActive: req.query.isActive === 'true' ? true : req.query.isActive === 'false' ? false : undefined,
        search: req.query.search
      };
      const result = await userService.getAllUsers(options);
      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get user by ID
   * GET /api/users/:id
   */
  async getUserById(req, res, next) {
    try {
      const user = await userService.getUserById(req.params.id);
      res.json({
        success: true,
        data: { user }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update user
   * PUT /api/users/:id
   */
  async updateUser(req, res, next) {
    try {
      const user = await userService.updateUser(req.params.id, req.body, req.user);
      res.json({
        success: true,
        message: 'User updated successfully',
        data: { user }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update password
   * PUT /api/users/:id/password
   */
  async updatePassword(req, res, next) {
    try {
      // Users can only update their own password
      if (req.user.id !== parseInt(req.params.id) && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'You can only update your own password'
        });
      }

      const { currentPassword, newPassword } = req.body;
      const result = await userService.updatePassword(req.params.id, currentPassword, newPassword);
      res.json({
        success: true,
        message: result.message
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete user (admin only)
   * DELETE /api/users/:id
   */
  async deleteUser(req, res, next) {
    try {
      const result = await userService.deleteUser(req.params.id, req.user);
      res.json({
        success: true,
        message: result.message
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
