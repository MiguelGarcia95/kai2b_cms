const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../../models/User');

const userController = require('../../controllers/default/users');

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
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

router.route('/login')
  .get(userController.loginGet)
  .post( passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/login',
    failureFlash: true,
    successFlash: true,
    session: true,
  }) ,userController.loginPost);

router.route('/register')
  .get(userController.registerGet)
  .post(userController.registerPost);

router.route('/logout').get(userController.logout);


module.exports = router;  
