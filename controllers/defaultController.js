const Post = require('../models/Post');
const Category = require('../models/Category');

module.exports = {
  index: async (req, res) => {
    try {
      const posts = await Post.find().populate('category', 'name');
      res.render('default/index', {posts: posts});
    } catch (error) {
      
    }
  },

  loginGet: (req, res) => {
    res.render('default/login');
  },

  loginPost: (req, res) => {
    res.send('congrats for sending us your creds fool')
  },

  registerGet: (req, res) => {
    res.render('default/register');
  },

  registerPost: (req, res) => {
    res.send('congrats for sending us your creds fool')
  },
}