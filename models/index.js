const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');

// User-Post associations
User.hasMany(Post, {
  foreignKey: 'user_id' // Changed from userId
});

Post.belongsTo(User, {
  foreignKey: 'user_id' // Changed from userId
});

// User-Comment associations
User.hasMany(Comment, {
  foreignKey: 'user_id' // Changed from userId
});

Comment.belongsTo(User, {
  foreignKey: 'user_id' // Changed from userId
});

// Post-Comment associations
Post.hasMany(Comment, {
  foreignKey: 'post_id' // Changed from postId
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id' // Changed from postId
});



module.exports = { User, Post, Comment };