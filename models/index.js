const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');

// User-Post associations
User.hasMany(Post, {
  foreignKey: 'user_id' 
});

Post.belongsTo(User, {
  foreignKey: 'user_id' 
});

// User-Comment associations
User.hasMany(Comment, {
  foreignKey: 'user_id' 
});

Comment.belongsTo(User, {
  foreignKey: 'user_id' 
});

// Post-Comment associations
Post.hasMany(Comment, {
  foreignKey: 'post_id' 
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id' 
});



module.exports = { User, Post, Comment };