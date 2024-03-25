'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Posts', [
      {
        title: 'Sample Post 1',
        body: 'This is a sample post content.',
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Add more posts as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Posts', null, {});
  }
};
