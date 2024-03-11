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


