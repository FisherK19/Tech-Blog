const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all posts with associated username
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }],
    });
    res.status(200).json(postData);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Get one post by ID with associated username and comments
router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, include: [{ model: User, attributes: ['username'] }] },
      ],
    });
    if (!postData) {
      res.status(404).json({ message: 'No post found with that id' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    console.error('Error fetching post:', err);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// Create a new post with authenticated user
router.post('/', withAuth, async (req, res) => {
  try {
    const { title, body } = req.body;

    if (!title || !body) {
      res.status(400).json({ error: 'Title and body are required' });
      return;
    }

    const newPost = await Post.create({
      title,
      body,
      user_id: req.session.user_id,
    });

    res.status(201).json(newPost);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Update an existing post with authenticated user
router.put('/:id', withAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;

    const updatedPost = await Post.update(
      { title, body },
      { where: { id, user_id: req.session.user_id } }
    );

    if (!updatedPost[0]) {
      res.status(404).json({ message: 'No post found with that id' });
      return;
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// Delete a post with authenticated user
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const { id } = req.params;

    // Delete all comments related to the post
    await Comment.destroy({ where: { post_id: id } });

    const deletedPost = await Post.destroy({
      where: { id, user_id: req.session.user_id },
    });

    if (!deletedPost) {
      res.status(404).json({ message: 'No post found with that id' });
      return;
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

module.exports = router;

