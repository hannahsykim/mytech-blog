
//index.js in controllers acts as an entry point for all routes
//it combines all routes and exports one router middleware module
const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');
const dashboardRoutes = require('./dashboardRoutes.js');
const singlePostRoutes = require('./singlePost.js');

//homeRoutes will have no prefix prepended to all routes
router.use('/', homeRoutes);
//dashboardRoutes will have /dashboard prepended to all routes
router.use('/dashboard', dashboardRoutes);
//apiRoutes will have /api prepended to all routes
router.use('/api', apiRoutes);
//singlepostRoutes will have /post prepended to all routes
router.use('/post', singlePostRoutes);

module.exports = router;

