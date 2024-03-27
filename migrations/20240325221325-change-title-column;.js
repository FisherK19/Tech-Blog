'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Correct usage of DataTypes
    await queryInterface.addColumn('posts', 'newColumn', {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('posts', 'newColumn');
  }
};
