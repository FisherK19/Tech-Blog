const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET /dashboard - Get all posts created by the logged-in user
router.get('/', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            where: { user_id: req.session.user_id },
            attributes: ['id', 'title', 'content', 'created_at'],
            include: [
                { model: User, attributes: ['username'] },
                { model: Comment, attributes: ['id', 'comment_text', 'created_at'], include: { model: User, attributes: ['username'] } }
            ]
        });

        // Serialize data before passing to template
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET /dashboard/edit/:id - Get a specific post for editing
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'title', 'content', 'created_at'],
            include: [
                { model: User, attributes: ['username'] },
                { model: Comment, attributes: ['id', 'comment_text', 'created_at'], include: { model: User, attributes: ['username'] } }
            ]
        });
        
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        // Serialize data before passing to template
        const post = dbPostData.get({ plain: true });
        res.render('edit-post', { post, loggedIn: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET /dashboard/new - Render form to create a new post
router.get('/new', (req, res) => {
    res.render('new-post');
});

module.exports = router;
