'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Comments', [
      {
        comment_text: 'This is a sample comment.',
        user_id: 1,
        post_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Add more comments as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};
