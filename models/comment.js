const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    comment_text: {
        type: DataTypes.STRING,
        validate: {
            len: [3] 
        }
    },
    user_id: { // Changed to snake_case to match the database
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user', // This references the `user` table
            key: 'id'
        }
    },
    post_id: { // Changed to snake_case to match the database
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'post', // This references the `post` table
            key: 'id'
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
});

module.exports = Comment;
