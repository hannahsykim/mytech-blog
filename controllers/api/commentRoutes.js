const router = require("express").Router();
const { Comment } = require("../../models/");
const withAuth = require("../../utils/auth");

// TODO - create a GET route for getting all comments
router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll();
    res.status(200).json(commentData);
    console.log('Comment received');
  } catch (err) {
    res.status(500).json(err);
  }
});

// TODO - create a POST route for creating a new comment
// This should be a protected route, so you'll need to use the withAuth middleware
router.post("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create(
      {
        body: req.body.body,
        userId: req.session.userId,
        postId: req.body.postId,
      });
    res.status(200).json(commentData);
    console.log('Comment created');
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
