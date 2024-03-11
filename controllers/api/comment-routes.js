const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to get all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.findAll();
        res.json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to get a single comment by ID
router.get('/:id', async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json(comment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to create a new comment
router.post('/', withAuth, async (req, res) => { // Use the withAuth middleware here
    try {
        const newComment = await Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id 
        });
        res.status(201).json(newComment);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Bad request' });
    }
});

// Route to update a comment by ID
router.put('/:id', withAuth, async (req, res) => { 
    try {
        const updatedComment = await Comment.update(
            { comment_text: req.body.comment_text },
            { where: { id: req.params.id } }
        );
        if (updatedComment[0] === 0) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json(updatedComment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to delete a comment by ID
router.delete('/:id', withAuth, async (req, res) => { 
    try {
        const deletedRows = await Comment.destroy({
            where: { id: req.params.id }
        });
        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json({ message: 'Comment deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;

