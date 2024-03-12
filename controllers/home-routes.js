const router = require('express').Router();
const { Post, Comment, User } = require('../models');

// Route for the homepage
router.get('/', async (req, res) => {
    try {
        // Fetch all posts from the database
        const dbPostData = await Post.findAll({
            attributes: ['id', 'title', 'content', 'created_at'],
            include: [
                { model: Comment, attributes: ['id', 'comment_text', 'created_at'], include: { model: User, attributes: ['username'] } },
                { model: User, attributes: ['username'] }
            ]
        });

        // Serialize the data before rendering the view
        const posts = dbPostData.map(post => post.get({ plain: true }));
        
        // Render the homepage view with the fetched posts
        res.render('home', { posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;




