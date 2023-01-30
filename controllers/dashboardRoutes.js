
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
    where: { userId: req.session.userId },
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["username"],
      }
    ] 
  });
  const posts = postsData.map((post) => post.get({ plain: true }));
  console.log(posts);
  res.render("admin-all-posts", { layout: "dashboard", posts });
  // refer to admin-all-posts.handlebars write the code to display the posts
});

// TODO - create logic for the GET route for /new that renders the new post page
// It should display a form for creating a new post
router.get("/create", withAuth, async (req, res) => {
  res.render("admin-new-post", { layout: "dashboard" });
});

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
          include: {
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
    res.render("edit-post", { layout: "dashboard", editPostData, loggedIn: true });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;

