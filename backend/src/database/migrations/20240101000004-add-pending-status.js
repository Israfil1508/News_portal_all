'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // For SQLite, enum values are stored as text and validated at application level
    // The Sequelize model already handles the new 'pending' value
    // No schema change needed for SQLite
    console.log('Note: SQLite stores enum as text. Model already updated to include "pending" status.');
  },

  async down(queryInterface, Sequelize) {
    // No schema change needed
    console.log('Note: No schema changes to revert for SQLite.');
  }
};
