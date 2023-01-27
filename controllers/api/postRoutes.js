
const router = require('express').Router();
const { Post } = require('../../models/');
const withAuth = require('../../utils/auth');

// TODO - create a POST route for creating a new post
// This should be a protected route, so you'll need to use the withAuth middleware
router.post("/", withAuth, async (req, res) => {
    try {
        const postData = await Post.create(
            {
                title: req.body.title,
                body: req.body.body,
                userId: req.session.userId,
            }
        );
    
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});


// TODO - create a PUT route for updating a post's title or body
// This should be a protected route, so you'll need to use the withAuth middleware
router.put("/:id", withAuth, async (req, res) => {
    try {
        const onePostData = await Post.update(
            {
                title: req.body.title,
                body: req.body.body,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        if (!onePostData) {
            res.status(404).json({ message: "No post found with this id!" });
            return;
        }
        res.status(200).json(onePostData);
    } catch (err) {
        res.status(500).json(err);
    }
});



// TODO - create a DELETE route for deleting a post with a specific id
// This should be a protected route, so you'll need to use the withAuth middleware
router.delete("/:id", withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy(
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        
        if (!postData) {
            res.status(404).json({ message: "No post found with this id!" });
            return;
        }
        res.status(200).json({ message: `Post ${req.params.id} deleted`, postData });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
