const router = require('express').Router();

// Import route modules
const blogRoutes = require('../controllers/api/blog-routes');
const commentRoutes = require('../controllers/api/comment-routes');
const postRoutes = require('../controllers/api/post-routes');
const userRoutes = require('../controllers/api/user-routes');

// Middleware for API routes
router.use('/blogs', blogRoutes);
router.use('/comments', commentRoutes);
router.use('/posts', postRoutes);
router.use('/users', userRoutes);

// Middleware for handling 404 errors
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;

