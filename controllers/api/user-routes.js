const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET a single user by ID
router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] },
            include: [
                { model: Post, attributes: ['id', 'title', 'content', 'created_at'] },
                { model: Comment, attributes: ['id', 'comment_text', 'created_at'], include: { model: Post, attributes: ['title'] } },
                { model: Post, attributes: ['title'] }
            ]
        });
        if (!userData) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(userData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST create a new user
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Bad request' });
    }
});

// POST login
router.post('/login', async (req, res) => {
    try {
        // Logic for user login
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST logout
router.post('/logout', async (req, res) => {
    try {
        // Logic for user logout
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT update user by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.update(req.body, {
            where: { id: req.params.id }
        });
        res.json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE delete user by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.destroy({
            where: { id: req.params.id }
        });
        res.json(deletedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
