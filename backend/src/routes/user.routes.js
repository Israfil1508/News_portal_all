const express = require('express');
const router = express.Router();
const { userController } = require('../controllers');
const { authenticate, isAdmin } = require('../middlewares');
const { updateUserValidation, updatePasswordValidation, userIdValidation } = require('../validations');

/**
 * @route   GET /api/users
 * @desc    Get all users
 * @access  Private (Admin only)
 */
router.get('/', authenticate, isAdmin, userController.getAllUsers);

/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID
 * @access  Private (Admin only)
 */
router.get('/:id', authenticate, isAdmin, userIdValidation, userController.getUserById);

/**
 * @route   PUT /api/users/:id
 * @desc    Update user
 * @access  Private (Owner or Admin)
 */
router.put('/:id', authenticate, updateUserValidation, userController.updateUser);

/**
 * @route   PUT /api/users/:id/password
 * @desc    Update user password
 * @access  Private (Owner only)
 */
router.put('/:id/password', authenticate, updatePasswordValidation, userController.updatePassword);

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete user
 * @access  Private (Admin only)
 */
router.delete('/:id', authenticate, isAdmin, userIdValidation, userController.deleteUser);

module.exports = router;
