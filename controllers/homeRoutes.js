
// homeroutes contains all the view routes that do not require any authentication
const router = require("express").Router();
const { Post, Comment, User } = require("../models/");

// TODO - work on GET route for getting all posts
// this page can be viewed without logging in
router.get("/", async (req, res) => {
  // TODO - retrieve all posts from the database
  // render the homepage template with the posts retrieved from the database
  // refer to homepage.handlebars write the code to display the posts
  let username;
  if (req.session.loggedIn) {
    username = req.session.username;
  }
  res.render("homepage", { username });
});

// TODO - create a GET route for getting a single post with its id
// this page can be viewed without logging in
router.get('/post/:id', async (req, res) => {
  try {
    const singlePost = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at']
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    });
    if (!singlePost) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    res.status(200).json(singlePost);
    res.render('single-post', { singlePost });
  } catch (err) {
    res.status(500).json(err);
  }
});

// This route renders the login page, which has been completed for you
router.get("/login", (req, res) => {
  //if users has an existing valid session, they will be redirected to the homepage
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  //render the login view otherwise, refer to login.handlebars
  res.render("login");
});



// This route renders the signup page, which has been completed for you
router.get("/signup", (req, res) => {
  //if users has an existing valid session, they will be redirected to the homepage
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  //render the login view otherwise, refer to signup.handlebars
  res.render("signup");
});

module.exports = router;

