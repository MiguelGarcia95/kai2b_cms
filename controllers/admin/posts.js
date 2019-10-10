const Post = require('../../models/Post');
const Category = require('../../models/Category');
const {isEmpty} = require('../../config/helperFunctions');
const fs = require('fs');

module.exports = {
  index: async (req, res) => {
    const user = req.user || false;
    const posts = await Post.find().populate('user', ['name', 'avatar']).sort({created_at: -1}).limit(10);
    res.render('admin/index', {user, posts});
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

  submitPost: async (req, res) => {
    let imagePath = '';
    req.body.user = req.user._id;
    const postValidation = Post.validatePost(req.body);
    if (postValidation.isValid) {
      const post = new Post(req.body);

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
    } else {
      req.flash('errors', postValidation.errors);
      res.redirect('/admin/post/create');
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
    const postValidation = Post.validatePostUpdate(req.body);
    console.log(postValidation);
    try {
      if (!postValidation.isValid) {
        req.flash('errors', postValidation.errors);
        return res.redirect(`/admin/posts/edit/${req.params.id}`);
      } else {
        console.log('sdf')
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
        // await Post.findByIdAndUpdate(req.params.id, {$set:req.body});
        req.flash('success-message', 'Post updated successfully');
        res.redirect('/admin/posts');
      }
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
}