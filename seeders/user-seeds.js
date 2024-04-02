'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user', [
      {
        username: 'user1',
        email: 'user1@example.com',
        password: 'password1',
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user', null, {});
  }
};
