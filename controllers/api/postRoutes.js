
const router = require('express').Router();
const { Post, Comment, User } = require('../../models/');
const withAuth = require('../../utils/auth');


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

    res.json(singlePost);
    } catch (err) {
    res.status(500).json(err);
    }
});

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

// // TODO - create a POST route for creating a new comment
// // This should be a protected route, so you'll need to use the withAuth middleware
// router.post("/comment/:id", withAuth, async (req, res) => {
//     try {
//       const commentData = await Comment.create(
//         {
//           body: req.body.body,
//           userId: req.session.userId,
//           postId: req.body.postId,
//         });
//       res.status(200).json(commentData);
//       console.log('Comment created');
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

//   //get all comments
// router.get("/comment", withAuth, async (req, res) => {
//     try {
//         const comment = await Comment.findAll({
//             include: [
//                 {
//                     model: User,
//                     attributes: ['username']
//                 }
//             ]
//         });
//         res.json(comment);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// // get singluar comment
// router.get("/comment/:id", withAuth, async (req, res) => {
//     try {
//         const comment = await Comment.findByPk(req.params.id, {
//             include: [
//                 {
//                     model: User,
//                     attributes: ['username']
//                 }
//             ]
//         });
//         if (!comment) {
//             res.status(404).json({ message: "No comment found with this id" });
//             return;
//         }

//         res.json(comment);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

  
module.exports = router;
