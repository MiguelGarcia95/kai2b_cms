const Post = require('../models/Post');
const User = require('../models/User');
const Category = require('../models/Category');
const bcrypt = require('bcryptjs');

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
      res.redirect('/');
    }
  },

  getCategory: async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      const posts = await Post.find({category: req.params.id});
      res.render('default/category/single', {category, posts});
    } catch (error) {
      res.redirect('/categories');
    }
  },

  getPosts: async (req, res) => {
    try {
      const posts = await Post.find().populate('category', 'name');;
      res.render('default/post/index', {posts});
    } catch (error) {
      res.redirect('/');
    }
  },

  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate('category', 'name');
      res.render('default/post/single', {post});
    } catch (error) {
      res.redirect('/');
    }
  },

  loginGet: (req, res) => {
    res.render('default/login');
  },

  loginPost: async (req, res) => {
    try {
      const user = await User.findOne({email: req.body.email});
      const match = await bcrypt.compare(req.body.password, user.password);
      if (match) {
        res.redirect('/admin');
      } else {
        // res.status(401).send('Authentication error');  
        res.redirect('/login');
      }
    } catch (error) {
      res.redirect('/login');
    }
  },

  registerGet: (req, res) => {
    res.render('default/register');
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