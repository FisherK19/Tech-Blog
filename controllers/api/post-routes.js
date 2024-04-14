const router = require('express').Router();
const { post, user, comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all posts
router.get('/', (req, res) => {
    console.log('======================');
    post.findAll({
        attributes: ['id', 'title', 'body', 'created_at'],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: user,
                attributes: ['username']
            },
            {
                model: comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: user,
                    attributes: ['username']
                }
            }
        ]
    })
        .then(dbPostData => res.json(dbPostData.reverse()))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET a single post by its ID
router.get('/:id', (req, res) => {
    post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'body', 'created_at'],
        include: [
            {
                model: user,
                attributes: ['username']
            },
            {
                model: comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: user,
                    attributes: ['username']
                }
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Create a post
router.post('/', withAuth, (req, res) => {
    console.log(req.body);
    post.create({
        title: req.body.title,
        body: req.body.body,
        user_id: req.session.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Update a post's title and body by its ID
router.put('/:id', withAuth, (req, res) => {
    post.update({
        title: req.body.title,
        body: req.body.body
    }, {
        where: {
            id: req.params.id
        }
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Delete a post by its ID
router.delete('/:id', withAuth, (req, res) => {
    post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;

