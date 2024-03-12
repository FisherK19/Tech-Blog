// auth.js

// Middleware function to check if the user is authenticated
const withAuth = (req, res, next) => {
    // Check if the user is authenticated using any method you prefer
    if (req.session && req.session.user_id) {
        // User is authenticated, proceed to the next middleware/route handler
        next();
    } else {
        // User is not authenticated, send an unauthorized response
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = withAuth;
