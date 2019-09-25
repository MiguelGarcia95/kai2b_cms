const Post = require('../models/Post');

module.exports = {
  index: (req, res) => {
    res.render('admin/index');
  },
  
  getPosts: async (req, res) => {
    try {
      const posts = await Post.find();
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

  createPost: (req, res) => {
    res.render('admin/post/create');
  }
}