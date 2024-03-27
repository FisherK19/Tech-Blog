const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class Post extends Model {}

Post.init({
  user_id: { 
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
