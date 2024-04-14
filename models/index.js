const user = require('./user');
const post = require('./post');
const comment = require('./comment');

// Create associations
user.hasMany(post, {
    foreignKey: 'user_id'
});

post.belongsTo(user, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
});

comment.belongsTo(user, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
});

comment.belongsTo(post, {
    foreignKey: 'post_id',
    onDelete: 'cascade'
});

user.hasMany(comment, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
});

post.hasMany(comment, {
    foreignKey: 'post_id',
    onDelete: 'cascade'
});

module.exports = { user, post, comment };
