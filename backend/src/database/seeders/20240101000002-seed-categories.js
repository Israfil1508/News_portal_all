'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      {
        name: 'Technology',
        slug: 'technology',
        description: 'Latest news and updates from the tech world',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Business',
        slug: 'business',
        description: 'Business news, market updates, and economic trends',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Sports',
        slug: 'sports',
        description: 'Sports news, scores, and highlights',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Entertainment',
        slug: 'entertainment',
        description: 'Movies, music, celebrities, and pop culture',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Health',
        slug: 'health',
        description: 'Health tips, medical news, and wellness advice',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Science',
        slug: 'science',
        description: 'Scientific discoveries and research news',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'World',
        slug: 'world',
        description: 'International news and global events',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
