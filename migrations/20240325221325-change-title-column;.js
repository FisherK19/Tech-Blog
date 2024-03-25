'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('posts', 'title', {
      type: Sequelize.STRING,
      allowNull: true, // Allow NULL values for the 'title' field
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('posts', 'title', {
      type: Sequelize.STRING,
      allowNull: false, // Restore NOT NULL constraint if needed
    });
  }
};

