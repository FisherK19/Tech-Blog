'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add a new column 'new_column' to the 'post' table
    await queryInterface.addColumn('post', 'new_column', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'default_value'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the 'new_column' column from the 'post' table
    await queryInterface.removeColumn('post', 'new_column');
  }
};