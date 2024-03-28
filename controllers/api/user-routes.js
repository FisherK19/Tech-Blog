const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const bcrypt = require('bcrypt');

// Serve the signup form on GET /signup
router.get('/signup', (req, res) => {
    // Renders the signup form using the Handlebars view called 'signup'
    res.render('signup', { layout: 'main' });
});

// GET /api/users - retrieve all users
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        res.json(users);
    } catch (err) {
        console.error(err); 
        res.status(500).json(err);
    }
});

// GET /api/users/:id - retrieve a single user by id
router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Post,
                    attributes: ['id', 'title', 'body', 'created_at'],
                    include: [
                        {
                            model: Comment,
                            attributes: ['id', 'comment_text', 'created_at'],
                            include: {
                                model: User,
                                attributes: ['username']
                            }
                        }
                    ]
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'created_at'],
                    include: {
                        model: Post,
                        attributes: ['title']
                    }
                }
            ]
        });

        if (!userData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }

        res.json(userData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// POST /api/users - create a new user
router.post('/api/posts', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await User.create({
            username: req.body.username,
            password: hashedPassword
        });

        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.username = newUser.username;
            req.session.loggedIn = true;

            res.json(newUser);
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// POST /api/users/login - log in a user
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ where: { username: req.body.username } });
        if (!user) {
            res.status(400).json({ message: 'No user with that username!' });
            return;
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.username = user.username;
            req.session.loggedIn = true;

            res.json({ user: user, message: 'You are now logged in!' });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// POST /api/users/logout - log out a user
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// PUT /api/users/:id - update a user's information
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id
            }
        });

        if (!updatedUser[0]) {
            res.status(404).json({ message: 'No user found with this id'});
            return;
        }

        res.json({ message: 'User information updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// DELETE /api/users/:id - delete a user
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!deletedUser) {
            res.status(404).json({ message: 'No user found with this id'});
            return;
        }

        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;
