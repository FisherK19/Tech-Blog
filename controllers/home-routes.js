const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const router = require('express').Router();
const withAuth = require('../utils/auth');
const bcrypt = require('bcrypt'); // Ensure bcrypt is included if you're using it for password comparison

// Route to get the homepage with posts
router.get('/', (req, res) => {
    console.log('Fetching posts...');
    Post.findAll({
        attributes: ['id', 'title', 'body', 'created_at'],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        }, {
            model: User,
            attributes: ['username']
        }],
        order: [['created_at', 'DESC']],
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        console.log('Rendering homepage with posts:', posts);
        res.render('partials/homepage', { 
            posts, 
            loggedIn: req.session.loggedIn 
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).send(err.message);
    });
});

// Login route
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });
        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }
        
        const validPassword = await bcrypt.compare(req.body.password, userData.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }
        
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;
            
            res.json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Signup route
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

// Route to log user out
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;


