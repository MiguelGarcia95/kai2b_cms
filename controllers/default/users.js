const User = require('../../models/User');
const md5 = require('md5');

module.exports = {
  loginGet: (req, res) => {
    const user = req.user || false;
    if (user) {
      req.flash('success-message', 'You are already logged in.');
      res.redirect('/');
    } else {
      res.render('default/login');
    }
  },

  loginPost: async (req, res) => {
  },

  logout: async (req, res) => {
    req.logout();
    req.flash('success-message', 'Logged out successfully.');
    res.redirect('/');
  },

  registerGet: (req, res) => {
    const user = req.user || false;
    if (user) {
      req.flash('success-message', 'You are already logged in.');
      res.redirect('/admin');
    } else {
      res.render('default/register');
    }
  },

  registerPost: async (req, res) => {
    // validateUser

    req.body.avatar = `https://gravatar.com/avatar/${md5(req.body.email)}?d=identicon`;
    
    try {
      User.validateUser(req.body);
      const user = await new User(req.body);
      await user.save();
      req.flash('success-message', 'Registration successful. Please login.');
      res.redirect('/login');
    } catch (error) {
      req.flash('error-message', error.message);
      res.redirect('/register');
    }
  },
}