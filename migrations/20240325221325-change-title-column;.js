'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Make sure DataTypes is used correctly here
    await queryInterface.addColumn('TableName', 'ColumnName', {
      type: Sequelize.DataTypes.STRING, 
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('TableName', 'ColumnName');
  }
};
