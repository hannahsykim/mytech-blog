
// homeroutes contains all the view routes that do not require any authentication
const router = require("express").Router();
const { Post, Comment, User } = require("../models/");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  const postsData = await Post.findAll({ 
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

  let username;
  if (req.session.loggedIn) {
    username = req.session.username;
  }

  res.render("homepage", { username, posts });
  // refer to admin-all-posts.handlebars write the code to display the posts
});

// // TODO - work on GET route for getting all posts
// // this page can be viewed without logging in
// router.get("/", async (req, res) => {
//   // TODO - retrieve all posts from the database
//   // render the homepage template with the posts retrieved from the database
//   // refer to homepage.handlebars write the code to display the posts
//   let username;
//   if (req.session.loggedIn) {
//     username = req.session.username;
//   }
//   res.render("homepage", { username });
// });

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

