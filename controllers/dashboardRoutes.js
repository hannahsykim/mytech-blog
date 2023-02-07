
// Dashboard Routes
// This is a set of routes that will be used to render the dashboard pages.
// All of these routes will be protected by the withAuth middleware function.

const router = require("express").Router();
const { Post, User, Comment } = require("../models/");
const withAuth = require("../utils/auth");

// TODO - create logic for the GET route for / that renders the dashboard homepage
// It should display all of the posts created by the logged in user
router.get("/", withAuth, async (req, res) => {
  const postsData = await Post.findAll({ 
    where: { 
      userId: req.session.userId
    },
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: User,
        attributes: ['username'],
      }
    ] 
  });
  const posts = postsData.map((post) => post.get({ plain: true }));
  //console.log(posts);
  res.render("admin-all-posts", { layout: "dashboard", posts });
  // refer to admin-all-posts.handlebars write the code to display the posts
});

// TODO - create logic for the GET route for /new that renders the new post page
// It should display a form for creating a new post
router.get("/create", withAuth, async (req, res) => {
  res.render("admin-new-post", { layout: "dashboard" });
});

//post route for creating a new post
router.post("/create", withAuth, async (req, res) => {
  try {

    await Post.create({
      title: req.body.title,
      body: req.body.body,
      userId: req.session.userId,
    })
    res.redirect("/dashboard");
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
          {
          model: User,
          attributes: ['username'],
          },
          {
            model: Comment,
            attributes: ['body'],
            include: {
              model: User,
              attributes: ['username'],
              }
          }
        ]
      });
    
      if (!postData) {
          res.status(404).json({ message: "No post found with this id" });
          return;
      }
      
      const post = postData.get({ plain: true });
              //console.log(post);
      res.render("admin-single-post", { layout: "dashboard", post });
        } catch (err) {
          res.status(500).json(err);
        }
      });


// TODO - create logic for the GET route for /edit/:id that renders the edit post page
// It should display a form for editing an existing post
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const editPost = await Post.findOne({
      where: {
        id: req.params.id,
      }, 
      attributes: ['id', 'title', 'body', 'createdAt'],

      include: [
        {
          model: Comment,
          attributes: ['id', 'body', 'postId', 'userId', 'createdAt'],
          include: 
          {
            model: User,
            attributes: ['username']
          }

        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    });
    const editPostData = editPost.get({ plain: true });
    //console.log(editPostData);
    res.render("edit-post", { editPostData }); 
  } catch (err) {
    res.status(500).json(err);
  }
});

//comment get route
router.get('/', withAuth, async (req, res) => {
  try {

  const commentData = await Comment.findAll({
      include: [
        { 
          model: User,
          attributes: ['username']
        }
      ],
      userId: req.session.userId,
      });
  if (!commentData) {
      res.status(404).json({ message: "No comment found with this id" });
      return;
  }

  const comments = commentData.map((commentData => commentData.get({ plain: true })));
  res.render("admin-single-post", { comments });
  console.log(comments);
  } catch (err) {
  res.status(500).json(err);
  }
});

//comment single get route
router.get('/:id', withAuth, async (req, res) => {
  try {
  const singleComment = await Comment.findByPk(req.params.id, {
  include: [
      {
      model: User,
      attributes: ['username']
      },
      
  ]
  });
  if (!singleComment) {
      res.status(404).json({ message: "No comment found with this id" });
      return;
  }

  const comments = singleComment.get({ plain: true });

  res.render("admin-single-post", { comments });
  } catch (err) {
  res.status(500).json(err);
  }
});


// // comment post route
// router.post('/:id', withAuth, async (req, res) => {
//   try {
//     const comments = await Comment.create(
//       { 
//           body: req.body.body,
//           userId: req.session.userId,
//           postId: req.body.postId,
//       });
//       res.redirect("admin-single-post", { comments });
//   } catch (err) {
//       res.status(500).json(err);
//   }
// });

module.exports = router;

