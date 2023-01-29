const router = require("express").Router();
const { Post, Comment, User } = require("../models");
const withAuth = require("../utils/auth");


// TODO - create a GET route for getting a single post with its id
router.get('/:id', withAuth, async (req, res) => {
    try {
    const singlePost = await Post.findByPk(req.params.id, {
    include: [
        {
        model: Comment,
        attributes: ['id', 'body', 'postId', 'userId', 'createdAt', 'updatedAt'],
        },
        {
        model: User,
        attributes: ['username']
        }
    ]
    });
    if (!singlePost) {
        res.status(404).json({ message: "No post found with this id" });
        return;
    }

    const singlePostData = singlePost.get({ plain: true });

    res.render("individual-post", {  layout: "dashboard", singlePostData});
    } catch (err) {
    res.status(500).json(err);
    }
});

router.get('/:id', withAuth, async (req, res) => {
    try {

    const singlePostComment = await Comment.findAll({
        include: [{ model: User}],
        where: { postId: req.params.id }
        });
    if (!singlePostComment) {
        res.status(404).json({ message: "No post found with this id" });
        return;
    }

    const singlePostCommentData = singlePostComment.map((comment) => comment.get({ plain: true }));
    res.render("individual-post", {  layout: "dashboard", singlePostCommentData});
    } catch (err) {
    res.status(500).json(err);
    }
});


module.exports = router;

