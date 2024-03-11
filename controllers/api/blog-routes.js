const express = require('express');
const router = express.Router();

// Import the Post model
const { Post } = require('../../models');

// Route to fetch all blog posts
router.get('/', async (req, res) => {
  try {
    // Logic to fetch all blog posts from the database
    const posts = await Post.findAll();
    // Send the fetched posts as a response
    res.json(posts);
  } catch (error) {
    // Handle any errors that occur during the fetch operation
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to create a new blog post
router.post('/', async (req, res) => {
  try {
    // Extract post data from the request body
    const { title, content } = req.body;
    // Logic to create a new blog post using the Post model
    const newPost = await Post.create({ title, content });
    // Send the newly created post as a response
    res.status(201).json(newPost);
  } catch (error) {
    // Handle any errors that occur during the creation operation
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Other routes for updating, deleting, etc.

module.exports = router;

