'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Add a new column 'new_column' to the 'post' table
    await queryInterface.addColumn('post', 'title', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'default_value'
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove the 'new_column' column from the 'post' table
    await queryInterface.removeColumn('post', 'title');
  }
};
