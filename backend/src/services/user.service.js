const { User } = require('../models');
const { Op } = require('sequelize');

class UserService {
  /**
   * Get all users (admin only)
   */
  async getAllUsers(options = {}) {
    const { page = 1, limit = 10, role, isActive, search } = options;
    const offset = (page - 1) * limit;

    const where = {};

    if (role) {
      where.role = role;
    }

    if (typeof isActive === 'boolean') {
      where.isActive = isActive;
    }

    if (search) {
      where[Op.or] = [
        { username: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
        { firstName: { [Op.iLike]: `%${search}%` } },
        { lastName: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const { count, rows } = await User.findAndCountAll({
      where,
      attributes: { exclude: ['password'] },
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });

    return {
      users: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    };
  }

  /**
   * Get user by ID
   */
  async getUserById(id) {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      throw { status: 404, message: 'User not found' };
    }

    return user;
  }

  /**
   * Update user
   */
  async updateUser(id, updateData, requestingUser) {
    const user = await User.findByPk(id);

    if (!user) {
      throw { status: 404, message: 'User not found' };
    }

    // Only admin can update other users or change roles
    if (requestingUser.id !== parseInt(id) && requestingUser.role !== 'admin') {
      throw { status: 403, message: 'You can only update your own profile' };
    }

    // Only admin can change roles
    if (updateData.role && requestingUser.role !== 'admin') {
      throw { status: 403, message: 'Only admin can change user roles' };
    }

    // Prevent changing own role if not admin
    if (updateData.role && requestingUser.id === parseInt(id) && requestingUser.role !== 'admin') {
      throw { status: 403, message: 'You cannot change your own role' };
    }

    const allowedFields = ['firstName', 'lastName', 'username', 'email'];
    if (requestingUser.role === 'admin') {
      allowedFields.push('role', 'isActive');
    }

    const filteredData = {};
    allowedFields.forEach(field => {
      if (updateData[field] !== undefined) {
        filteredData[field] = updateData[field];
      }
    });

    await user.update(filteredData);

    return user.toSafeObject();
  }

  /**
   * Update password
   */
  async updatePassword(userId, currentPassword, newPassword) {
    const user = await User.findByPk(userId);

    if (!user) {
      throw { status: 404, message: 'User not found' };
    }

    const isValidPassword = await user.comparePassword(currentPassword);

    if (!isValidPassword) {
      throw { status: 401, message: 'Current password is incorrect' };
    }

    await user.update({ password: newPassword });

    return { message: 'Password updated successfully' };
  }

  /**
   * Delete user (admin only)
   */
  async deleteUser(id, requestingUser) {
    if (requestingUser.role !== 'admin') {
      throw { status: 403, message: 'Only admin can delete users' };
    }

    if (requestingUser.id === parseInt(id)) {
      throw { status: 400, message: 'You cannot delete your own account' };
    }

    const user = await User.findByPk(id);

    if (!user) {
      throw { status: 404, message: 'User not found' };
    }

    await user.destroy();

    return { message: 'User deleted successfully' };
  }
}

module.exports = new UserService();
