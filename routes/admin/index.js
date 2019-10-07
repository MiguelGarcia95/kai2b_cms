const express = require('express');
const router = express.Router();
const {isUserAuthenticated} = require('../../config/helperFunctions');
const posts = require('./posts');
const comments = require('./comments');
const users = require('./users');
const categories = require('./categories');

router.all('/*', isUserAuthenticated, (req, res, next) => {
  req.app.locals.layout = 'admin';
  next();
});

router.use('/', posts);
router.use('/', comments);
router.use('/', users);
router.use('/', categories);

module.exports = router;  

