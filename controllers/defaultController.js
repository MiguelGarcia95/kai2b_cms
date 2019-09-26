const Post = require('../models/Post');
const Category = require('../models/Category');

module.exports = {
  index: async (req, res) => {
    try {
      const posts = await Post.find().populate('category', 'name');
      res.render('default/index', {posts});
    } catch (error) {
      
    }
  },

  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.render('default/category/index', {categories});
    } catch (error) {
      
    }
  },

  getPosts: async (req, res) => {
    try {
      const posts = await Post.find();
      res.render('default/post/index', {posts});
    } catch (error) {
      
    }
  },

  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.render('default/post/single', {post});
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