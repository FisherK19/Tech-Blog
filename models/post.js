const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class Post extends Model {}

Post.init({
  // other fields...
  user_id: { // Make sure this matches your database column name
    type: DataTypes.INTEGER,
    references: {
      model: 'user', 
      key: 'id'
    }
  }
}, {
  sequelize,
  freezeTableName: true,
  underscored: true,
  modelName: 'post'
});

module.exports = Post;
