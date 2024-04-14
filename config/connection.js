const Sequelize = require('sequelize');

require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  console.log('Using JAWSDB');
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  console.log('Using local database');
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: 3306
  });
}

module.exports = sequelize;
