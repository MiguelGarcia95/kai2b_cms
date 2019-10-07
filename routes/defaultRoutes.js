const express = require('express');
const router = express.Router();
const defaultController = require('../controllers/defaultController');

const bcrypt = require('bcryptjs');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/User');

router.all('/*', (req, res, next) => {
  req.app.locals.layout = 'default';
  next();
})

router.route('/').get(defaultController.index);


router.route('/categories').get(defaultController.getCategories);
router.route('/categories/:id').get(defaultController.getCategory);
router.route('/posts').get(defaultController.getPosts);
router.route('/posts/:id')
  .get(defaultController.getPost)
  .post(defaultController.postComment);


module.exports = router;  