const router = require('express').Router();

// Import route modules
const commentRoutes = require('./comment-routes');
const postRoutes = require('./post-routes');
const userRoutes = require('./user-routes');

// Middleware for API routes
router.use('/comments', commentRoutes);
router.use('/posts', postRoutes);
router.use('/users', userRoutes);

// Middleware for handling 404 errors
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;


