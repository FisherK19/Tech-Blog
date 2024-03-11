// post-routes.js

const express = require('express');
const router = express.Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to create a new post (protected by authentication)
router.post('/', withAuth, async (req, res) => {
    try {
        const { title, content } = req.body;
        const newPost = await Post.create({ title, content });
        res.status(201).json(newPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to update a post by ID (protected by authentication)
router.put('/:id', withAuth, async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedPost = await Post.update(
            { title, content },
            { where: { id: req.params.id } }
        );
        if (updatedPost[0] === 0) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(updatedPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to delete a post by ID (protected by authentication)
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletedRows = await Post.destroy({
            where: { id: req.params.id }
        });
        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json({ message: 'Post deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Other routes for getting posts, getting a single post by ID, etc.

module.exports = router;


