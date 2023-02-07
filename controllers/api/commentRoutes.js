const router = require('express').Router();
const { Comment, Post, User } = require('../../models/');
const withAuth = require('../../utils/auth');

// TODO - create a POST route for creating a new comment
// This should be a protected route, so you'll need to use the withAuth middleware
router.post("/", withAuth, async (req, res) => {
    try {
    

    const comments = await Comment.create(
        { 
            body: req.body.body,
            postId: req.body.postId,
            userId: req.session.userId,
        });
        
        res.status(200).json(comments);
        console.log(comments);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


router.get("/", withAuth, async (req, res) => {
    try {
        const commentData = await Comment.findAll();

    if (!commentData) {
        res.status(404).json({ message: "No comment found with this id" });
        return;
    }
    const comments = commentData.map((commentData) => commentData.get({ plain: true }));
    res.status(200).json(comments);
    console.log(comments);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get singular comment
router.get("/:id", withAuth, async (req, res) => {
    try {
        const comments = await Comment.findOne(
            {
                where: {
                    id: req.params.id
                }
            },
            {
                include: [
                    {
                    model: User,
                    attributes: ['username']
                    }
            ]
        });
        if (!comments) {
            res.status(404).json({ message: "No comment found with this id" });
            return;
        }

        res.status(200).json(comments);
    } catch (err) {
    res.status(500).json(err);
    }
});


module.exports = router;