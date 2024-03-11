'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'sample_user',
        email: 'sample@example.com',
        password: 'password123',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Add more users as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
