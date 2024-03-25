const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const router = require('express').Router();

// Existing home route
router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'title',
      'body', 
      'created_at'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(dbPostData => {
    const posts = dbPostData.map(post => post.get({ plain: true }));
    // Render the "homepage" view from the "partials" directory
    res.render('partials/homepage', { posts, loggedIn: req.session.loggedIn });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Login route
router.get('/login', (req, res) => {
  // Render the login page
  res.render('login');
});

// Signup route
router.get('/signup', (req, res) => {
  // Render the signup page
  res.render('signup');
});

module.exports = router;



