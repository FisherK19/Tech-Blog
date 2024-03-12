const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

// Initialize the Post model
Post.init(
  {
    // Define the title column
    title: {
      type: DataTypes.STRING,
      allowNull: false // Title cannot be null
    },
    // Define the content column
    content: {
      type: DataTypes.TEXT,
      allowNull: false // Content cannot be null
    }
  },
  {
    sequelize, // Connect the model to Sequelize
    timestamps: true, // Add createdAt and updatedAt fields to the table
    modelName: 'post', // Set the model name
    // Define options here if needed
  }
);

module.exports = Post;

