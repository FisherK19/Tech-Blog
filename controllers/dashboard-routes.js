// controllers/dashboard.js

const express = require('express');
const router = express.Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

// Route to the dashboard
router.get('/', withAuth, async (req, res) => {
  try {
    // Fetch posts created by the logged-in user
    const dbPostData = await Post.findAll({
      where: { user_id: req.session.user_id },
      attributes: ['id', 'title', 'content', 'created_at'],
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, attributes: ['id', 'comment_text', 'created_at'], include: { model: User, attributes: ['username'] } }
      ]
    });

    const posts = dbPostData.map(post => post.get({ plain: true }));
    res.render('dashboard', { posts, loggedIn: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;


