const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');
const Category = require('../models/Category');
const md5 = require('md5');

module.exports = {
  index: async (req, res) => {
    try {
      const posts = await Post.find().populate([{path:'category', select:'name'}, {path:'user', select:'avatar name'}]);
      const sliderPosts = posts.slice(0, 3);
      const popularPosts = posts.slice(0, 6);
      const user = req.user || false;
      res.render('default/index', {posts, user, sliderPosts, popularPosts});
    } catch (error) {
      req.flash('error-message', 'Could not get any posts. Try again.');
      res.redirect('back');
    }
  }, 

  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      const user = req.user || false;
      res.render('default/category/index', {categories, user});
    } catch (error) {
      req.flash('error-message', 'Could not get any categories. Try again.');
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
      req.flash('error-message', 'Could not get any posts. Try again.');
      res.redirect('/categories');
    }
  },

  getPosts: async (req, res) => {
    try {
      const user = req.user || false;
      const posts = await Post.find().populate('category', 'name');
      res.render('default/post/index', {posts, user});
    } catch (error) {
      req.flash('error-message', 'Could not get any posts. Try again.');
      res.redirect('/');
    }
  },

  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate([{path:'category', select:'name'}, {path:'user', select:'avatar name'}]);
      const comments = await Comment.find({post: req.params.id}).populate('user', ['name', 'avatar']);
      const user = req.user || false;
      if (post) {
        res.render('default/post/single', {post, user, comments});
      } else {
        req.flash('error-message', 'Post does not exist.');
        res.redirect('/');
      }
    } catch (error) {
      res.redirect('/');
    }
  },

  postComment: async (req, res) => {
    req.body.post = req.params.id;
    const comment = await new Comment(req.body);
    const user = await User.findById(req.user);
    try {
      if (user) {
        await comment.save();
        res.redirect('back');
        req.flash('success-message', 'Comment posted.');
      } else {
        res.redirect('back');
        req.flash('error-message', 'Please Login.');
      }
    } catch (error) {
      req.flash('error-message', 'Could not post comment.');
      res.redirect('back');
    }
  },

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
    req.body.avatar = `https://gravatar.com/avatar/${md5(req.body.email)}?d=identicon`;
    const user = await new User(req.body);
    try {
      await user.save();
      req.flash('success-message', 'Registration successful. Please login.');
      res.redirect('/login');
    } catch (error) {
      req.flash('error-message', error.message);
      res.redirect('/register');
    }
  },
}