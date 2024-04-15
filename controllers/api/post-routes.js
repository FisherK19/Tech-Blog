const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// Get all posts with associated username
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ["username"] }],
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get one post by ID with associated username and comments
router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Comment,
          include: [{ model: User, attributes: ["username"] }],
        },
      ],
    });
    if (!postData) {
      res.status(404).json({ message: "No post found with that id!" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new post with authenticated user
router.post("/", withAuth, async (req, res) => {
    try {
      // Ensure that the request body contains the required fields
      if (!req.body.title || !req.body.body) {
        return res.status(400).json({ error: "Title and body are required" });
      }
  
      // Create a new post with the provided data
      const newPost = await Post.create({
        title: req.body.title,
        body: req.body.body,
        user_id: req.session.user_id,
      });
  
      // Respond with the created post data
      res.status(200).json(newPost);
    } catch (err) {
      // Log the error for debugging purposes
      console.error("Error creating post:", err);
  
      // Return a more informative error response
      res.status(500).json({ error: "Failed to create post", details: err.message });
    }
  });
  
  

// Update an existing post with authenticated user
router.put("/:id", withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updatedPost) {
      res.status(404).json({ message: "No post found with that id!" });
      return;
    }
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a post with authenticated user
router.delete("/:id", withAuth, async (req, res) => {
  try {
    // Delete all comments related to the post
    await Comment.destroy({
      where: { post_id: req.params.id },
    });

    const deletedPost = await Post.destroy({
      where: { id: req.params.id },
    });

    if (!deletedPost) {
      res.status(404).json({ message: "No post found with that id!" });
      return;
    }
    res.status(200).json(deletedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Export the router
module.exports = router;

