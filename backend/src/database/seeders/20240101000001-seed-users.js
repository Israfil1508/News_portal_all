'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    await queryInterface.bulkInsert('users', [
      {
        username: 'admin',
        email: 'admin@newsportal.com',
        password: hashedPassword,
        first_name: 'Admin',
        last_name: 'User',
        role: 'admin',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: 'editor',
        email: 'editor@newsportal.com',
        password: await bcrypt.hash('editor123', salt),
        first_name: 'Editor',
        last_name: 'User',
        role: 'editor',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: 'johndoe',
        email: 'john@example.com',
        password: await bcrypt.hash('user123', salt),
        first_name: 'John',
        last_name: 'Doe',
        role: 'user',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
