const Post = require('../models/Post');
const Category = require('../models/Category');
const Comment = require('../models/Comment');
const {isEmpty} = require('../config/helperFunctions')
const fs = require('fs');

module.exports = {
  index: (req, res) => {
    const user = req.user || false;
    res.render('admin/index', {user});
  },
  
  getPosts: async (req, res) => {
    try {
      const posts = await Post.find().populate('category', 'name');
      const user = req.user || false;
      res.render('admin/post/index', {posts, user});
    } catch (error) {
      req.flash('error-message', 'Could not get posts. Try Again');
      res.render('admin/index', {user});
    }
  },

  getPostComments: async (req, res) => {
    const user = req.user || false;
    try {
      const post = await Post.findById(req.params.id);
      // const post = await Post.findById(req.params.id).populate([{path:'category', select:'name'}, {path:'user', select:'avatar name'}]);
      const comments = await Comment.find({post: req.params.id}).populate('user', ['name', 'avatar']);
      res.render('admin/comments/index', {user, comments, post});
    } catch (error) {
      req.flash('error-message', 'Could not get post comments. Try Again');
      res.redirect('/admin/posts')
    }
  },

  approvePostComment: async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      await comment.updateOne({$set:{'approved': !comment.approved}});
      req.flash('success-message', 'Comment was approved!');
      res.redirect('back')
    } catch (error) {
      req.flash('error-message', 'Comment could not be approved');
      res.redirect('/admin/posts');
    }
  },

  deletePostComment: async (req, res) => {
    try {
      await Comment.findByIdAndDelete(req.params.id);
      req.flash('success-message', `Comment was deleted`);
      res.redirect('back')
    } catch (error) {
      req.flash('error-message', 'Comment could not be deleted');
    }
  },

  submitPost: async (req, res) => {
    // later validate content
    
    let imagePath = '';
    req.body.user = req.user._id;
    const post = new Post(req.body);
    try {
      if (!isEmpty(req.files)) {
        let file = req.files.postImage;
        imagePath = `/uploads/${post._id}.${file.mimetype.replace('image/', '')}`
  
        file.mv('./public'+imagePath, error => {
          if (error) throw error;
        })
      }
      post.image = imagePath;
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
    const user = req.user || false;
    res.render('admin/post/create', {categories, user});
  },

  editPost: async (req, res) => {
    try {
      const categories = await Category.find();
      const user = req.user || false;
      const post = await Post.findById(req.params.id).populate('category');
      res.render('admin/post/edit', {post, categories, user});
    } catch (error) {
      req.flash('error-message', 'Post could not be found');
      res.redirect('/admin/posts');
    }
  },

  updatePost: async (req, res) => {
    try {
      if (!req.body.allowComments) {
        req.body.allowComments = false;
      }
      if (!isEmpty(req.files)) {
        let file = req.files.postImage;
        let imagePath = `/uploads/${req.params.id}.${file.mimetype.replace('image/', '')}`
  
        file.mv('./public'+imagePath, error => {
          if (error) throw error;
        })
        req.body.image = imagePath
      }
      await Post.findByIdAndUpdate(req.params.id, {$set:req.body});
      req.flash('success-message', 'Post updated successfully');
      res.redirect('/admin/posts');
    } catch (error) {
      req.flash('error-message', 'Post could not be updated');
      res.redirect('/admin/posts');
    }
  },

  deletePost: async (req, res) => {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);
      fs.unlink(`./public${post.image}`, error => {
        if (error) throw error;
     });
      req.flash('success-message', `Post ${post.title} was deleted`);
      res.redirect('/admin/posts');
    } catch (error) {
      req.flash('error-message', 'Post could not be deleted');
    }
  },

  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      const user = req.user || false;
      res.render('admin/category/index', {categories, user});
    } catch (error) {
      
    }
  },

  getComments: async (req, res) => {

  },

  createCategories: async (req, res) => {
    try {
      const category = await new Category(req.body)
      await category.save();
      res.status(200).json(category);
    } catch (error) {
      req.flash('error-message', 'Category could not be created');
      res.redirect('back');
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