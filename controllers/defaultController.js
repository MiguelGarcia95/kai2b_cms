const Post = require('../models/Post');
const User = require('../models/User');
const Category = require('../models/Category');

module.exports = {
  index: async (req, res) => {
    try {
      const posts = await Post.find().populate('category', 'name');
      const user = req.user || false;
      res.render('default/index', {posts, user});
    } catch (error) {
      
    }
  }, 

  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      const user = req.user || false;
      res.render('default/category/index', {categories, user});
    } catch (error) {
      res.redirect('/');
    }
  },

  getCategory: async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      const posts = await Post.find({category: req.params.id});
      const user = req.user || false;
      res.render('default/category/single', {category, posts, user});
    } catch (error) {
      res.redirect('/categories');
    }
  },

  getPosts: async (req, res) => {
    try {
      const user = req.user || false;
      const posts = await Post.find().populate('category', 'name');;
      res.render('default/post/index', {posts, user});
    } catch (error) {
      res.redirect('/');
    }
  },

  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate('category', 'name');
      const user = req.user || false;
      res.render('default/post/single', {post, user});
    } catch (error) {
      res.redirect('/');
    }
  },

  loginGet: (req, res) => {
    const user = req.user || false;
    if (user) {
      res.redirect('/')
    } else {
      res.render('default/login');
    }
  },

  loginPost: async (req, res) => {
  },

  logout: async (req, res) => {
    req.logout();
    res.redirect('/');
  },


  registerGet: (req, res) => {
    const user = req.user || false;
    if (user) {
      res.redirect('/');
    } else {
      res.render('default/register');
    }
  },

  registerPost: async (req, res) => {
    const user = await new User(req.body);
    try {
      await user.save();
      res.redirect('/');
    } catch (error) {
      res.redirect('/register');
    }
  },
}