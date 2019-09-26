const Post = require('../models/Post');
const Category = require('../models/Category');

module.exports = {
  index: (req, res) => {
    res.render('admin/index');
  },
  
  getPosts: async (req, res) => {
    try {
      const posts = await Post.find().populate('category', 'name');
      res.render('admin/post/index', {posts: posts});
    } catch (error) {
      
    }
  },

  submitPost: async (req, res) => {
    // later validate content
    const post = new Post(req.body);
    try {
      await post.save();
      req.flash('success-message', 'Post created Successfully');
      res.redirect('/admin/posts');
    } catch (error) {
      req.flash('error-message', 'Post could not be created');
      res.redirect('/admin/posts');
    }
  },

  createPost: async (req, res) => {
    const categories = await Category.find();
    res.render('admin/post/create', {categories});
  },

  editPost: async (req, res) => {
    try {
      const categories = await Category.find();
      const post = await Post.findById(req.params.id).populate('category');
      res.render('admin/post/edit', {post, categories});
    } catch (error) {
      req.flash('error-message', 'Post could not be found');
      res.redirect('/admin/posts');
    }
  },

  deletePost: async (req, res) => {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);
      req.flash('success-message', `Post ${post.title} was deleted`);
      res.redirect('/admin/posts');
    } catch (error) {
      req.flash('error-message', 'Post could not be deleted');
    }
  },

  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.render('admin/category/index', {categories: categories});
    } catch (error) {
      
    }
  },

  createCategories: async (req, res) => {
    try {
      const category = await new Category(req.body)
      await category.save();
      res.status(200).json(category);
    } catch (error) {
      
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);
      req.flash('success-message', `Category ${category.name} was deleted`);
      res.redirect('/admin/categories');
    } catch (error) {
      req.flash('error-message', 'Category could not be deleted');
    }
  },
}