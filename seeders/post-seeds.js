'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('comments', [
      {
        comment_text: 'This is a sample comment.',
        user_id: 14, 
        post_id: 1, 
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('comments', null, {});
  }
};

