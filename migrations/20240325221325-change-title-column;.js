'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('post', 'title', {
      type: Sequelize.STRING,
      allowNull: true, // or false depending on your requirements
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('post', 'title', {
      type: Sequelize.STRING,
      allowNull: false, // Restore NOT NULL constraint if needed
    });
  }
};

