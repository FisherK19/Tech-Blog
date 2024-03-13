const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// GET all posts
router.get('/', async (req, res) => {
    try {
        // Find all posts with associated user and comments, ordered by creation date
        const dbPostData = await Post.findAll({
            attributes: ['id', 'title', 'content', 'created_at'],
            order: [['created_at', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        });
        // Reverse the order of posts to show the newest first
        const posts = dbPostData.reverse();
        // Send the response with the posts data
        res.json(posts);
    } catch (err) {
        // Handle errors
        console.log(err);
        res.status(500).json(err);
    }
});

// GET a single post
router.get('/:id', async (req, res) => {
    try {
        // Find a single post by ID with associated user and comments
        const dbPostData = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'title', 'content', 'created_at'],
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        });
        // If the post is not found, return a 404 response
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        // Send the response with the post data
        res.json(dbPostData);
    } catch (err) {
        // Handle errors
        console.log(err);
        res.status(500).json(err);
    }
});

// Create a post
router.post('/', withAuth, async (req, res) => {
    try {
        // Create a new post using the request body and the user ID from the session
        const dbPostData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        });
        // Send the response with the newly created post data
        res.json(dbPostData);
    } catch (err) {
        // Handle errors
        console.log(err);
        res.status(500).json(err);
    }
});

// Update a post
router.put('/:id', withAuth, async (req, res) => {
    try {
        // Update the post with the specified ID using the request body
        const dbPostData = await Post.update({
            title: req.body.title,
            content: req.body.content
        }, {
            where: {
                id: req.params.id
            }
        });
        // If no rows were affected, return a 404 response
        if (dbPostData[0] === 0) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        // Send the response with the updated post data
        res.json(dbPostData);
    } catch (err) {
        // Handle errors
        console.log(err);
        res.status(500).json(err);
    }
});

// Delete a post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        // Delete the post with the specified ID
        const dbPostData = await Post.destroy({
            where: {
                id: req.params.id
            }
        });
        // If no rows were affected, return a 404 response
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        // Send the response with the deleted post data
        res.json(dbPostData);
    } catch (err) {
        // Handle errors
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
