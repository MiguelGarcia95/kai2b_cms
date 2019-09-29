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

// Defining local strat
passport.use(new localStrategy({
  usernameField: 'email',
  passReqToCallback: true,
}, async (req, email, password, done) => {
  const user = await User.findOne({email: email});

  if (!user) {
    return done(null, false, req.flash('error-message', 'User not found with this email.'));
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return done(null, false, req.flash('error-message', 'Invalid username or password.'));
  }

  return done(null, user, req.flash('success-message', 'Login Successful'));
}))

router.route('/login')
  .get(defaultController.loginGet)
  .post(defaultController.loginPost);

router.route('/register')
  .get(defaultController.registerGet)
  .post(defaultController.registerPost);

router.route('/categories').get(defaultController.getCategories);
router.route('/categories/:id').get(defaultController.getCategory);
router.route('/posts').get(defaultController.getPosts);
router.route('/posts/:id').get(defaultController.getPost);

module.exports = router;  