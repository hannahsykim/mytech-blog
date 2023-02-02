const router = require('express').Router();
const { Post, Comment, User } = require('../../models/');
const withAuth = require('../../utils/auth');

  //get all comments
router.get("/", withAuth, async (req, res) => {
    try {
        const comments = await Comment.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get singular comment
router.get("/:id", withAuth, async (req, res) => {
    try {
        const comments = await Comment.findByPk(req.params.id, {
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

// TODO - create a POST route for creating a new comment
// This should be a protected route, so you'll need to use the withAuth middleware
router.post("/", withAuth, async (req, res) => {
    try {
      const comments = await Comment.create(
        {
            body: req.body.body,
            userId: req.session.userId,
            postId: req.body.postId,
        }   
        );
      res.status(200).json(comments);
      //console.log('Comment created');
    } catch (err) {
      res.status(500).json(err);
    }
  });

//put update
// router.put("/:id", withAuth, async (req, res) => {
//     try {
//         const checkID = await Comment.findByPk(req.params.id);
//         const commentData = await Comment.update(req.body, {
//             where: {
//                 id: req.params.id,
//             },
//         });
//         if (!checkID) {
//             res.status(404).json({ message: "No comment found with this id" });
//             return;
//         }
//         res.status(200).json(commentData);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });



module.exports = router;