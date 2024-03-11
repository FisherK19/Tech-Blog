const { Post, User, Comment } = require('../models');
const router = require('express').Router();

// Route for the homepage
router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            attributes: ['id', 'title', 'content', 'created_at'],
            include: [
                { model: Comment, attributes: ['id', 'comment_text', 'created_at'], include: { model: User, attributes: ['username'] } },
                { model: User, attributes: ['username'] }
            ]
        });

        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', { posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route for the login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// Route for the signup page
router.get('/signup', (req, res) => {
    res.render('signup');
});

// Route for viewing a single post
router.get('/post/:id', async (req, res) => {
    try {
        const dbPostData = await Post.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'title', 'content', 'created_at'],
            include: [
                { model: Comment, attributes: ['id', 'comment_text', 'created_at'], include: { model: User, attributes: ['username'] } },
                { model: User, attributes: ['username'] }
            ]
        });

        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        const post = dbPostData.get({ plain: true });
        res.render('single-post', { post, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route for viewing posts with comments
router.get('/posts-comments', async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            attributes: ['id', 'title', 'content', 'created_at'],
            include: [
                { model: Comment, attributes: ['id', 'comment_text', 'created_at'], include: { model: User, attributes: ['username'] } },
                { model: User, attributes: ['username'] }
            ]
        });

        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('posts-comments', { posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;

