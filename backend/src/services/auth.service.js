const jwt = require('jsonwebtoken');
const config = require('../config');
const { User } = require('../models');

class AuthService {
  /**
   * Register a new user
   */
  async register(userData) {
    const { username, email, password, firstName, lastName } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({
      where: {
        [require('sequelize').Op.or]: [{ email }, { username }]
      }
    });

    if (existingUser) {
      const field = existingUser.email === email ? 'email' : 'username';
      throw { status: 409, message: `User with this ${field} already exists` };
    }

    // Create new user
    const user = await User.create({
      username,
      email,
      password,
      firstName,
      lastName,
      role: 'user'
    });

    // Generate token
    const token = this.generateToken(user);

    return {
      user: user.toSafeObject(),
      token
    };
  }

  /**
   * Login user
   */
  async login(email, password) {
    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw { status: 401, message: 'Invalid email or password' };
    }

    // Check if user is active
    if (!user.isActive) {
      throw { status: 403, message: 'Your account has been deactivated' };
    }

    // Verify password
    const isValidPassword = await user.comparePassword(password);

    if (!isValidPassword) {
      throw { status: 401, message: 'Invalid email or password' };
    }

    // Update last login
    await user.update({ lastLogin: new Date() });

    // Generate token
    const token = this.generateToken(user);

    return {
      user: user.toSafeObject(),
      token
    };
  }

  /**
   * Get current user profile
   */
  async getProfile(userId) {
    const user = await User.findByPk(userId);

    if (!user) {
      throw { status: 404, message: 'User not found' };
    }

    return user.toSafeObject();
  }

  /**
   * Generate JWT token
   */
  generateToken(user) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn }
    );
  }

  /**
   * Verify JWT token
   */
  verifyToken(token) {
    try {
      return jwt.verify(token, config.jwtSecret);
    } catch (error) {
      throw { status: 401, message: 'Invalid or expired token' };
    }
  }
}

module.exports = new AuthService();
