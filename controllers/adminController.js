const Post = require('../models/Post');
const Category = require('../models/Category');
const Comment = require('../models/Comment');
const User = require('../models/User');
// const {isEmpty} = require('../config/helperFunctions')

module.exports = {
  index: async (req, res) => {
    const user = req.user || false;
    const posts = await Post.find().populate('user', ['name', 'avatar']).sort({created_at: -1}).limit(10);
    res.render('admin/index', {user, posts});
  },
  
  getPostComments: async (req, res) => {
    const user = req.user || false;
    try {
      const post = await Post.findById(req.params.id);
      const comments = await Comment.find({post: req.params.id}).populate('user', ['name', 'avatar']);
      res.render('admin/comments/index', {user, comments, post});
    } catch (error) {
      req.flash('error-message', 'Could not get post comments. Try Again');
      res.redirect('/admin/posts')
    }
  },

  getUsers: async (req, res) => {
    const user = req.user || false;
    try {
      const users = await User.find();
      let admin, subadmin, regularUser;
      admin = users.filter(u => u.privilege === 'admin');
      subadmin = users.filter(u => u.privilege === 'subadmin');
      regularUser = users.filter(u => u.privilege === 'user');

      res.render('admin/users/index', {user, users, admin, subadmin, regularUser});
    } catch (error) {
      req.flash('error-message', 'Could not get users. Try Again');
      res.redirect('/admin');
    }
  },
  
  updateUserPrivileges: async (req, res) => {
    const user = req.user || false;
    try {
      const userToUpdate = await User.findById(req.params.id);
      req.flash('success-message', `User ${userToUpdate.name} updated to ${req.body.privilege}`);
      await userToUpdate.updateOne({$set:{'privilege': req.body.privilege}});
      res.redirect('back');
    } catch (error) {
      req.flash('error-message', 'Could update user privileges. Try Again');
      res.redirect('/admin');
    }
  },
  
  editUser: async (req, res) => {
    const user = req.user || false;
    try {
      const userToUpdate = await User.findById(req.params.id);
      if (String(userToUpdate._id) === String(user._id)) {
        res.render('admin/users/edit', {user, userToUpdate})
      } else {
        req.flash('error-message', 'You can only edit your account.');
        res.redirect('/admin/users');
      }
    } catch (error) {
      req.flash('error-message', 'Could not get user. Try Again');
      res.redirect('/admin/users');
    }
  },

  updateUser: async (req, res) => {
    const user = req.user || false;
    try {
      await User.findByIdAndUpdate(req.params.id, {$set:req.body});
      res.redirect('/admin/users');
    } catch (error) {
      req.flash('error-message', 'Could update user privileges. Try Again');
      res.redirect('/admin');
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

  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      const user = req.user || false;
      res.render('admin/category/index', {categories, user});
    } catch (error) {
      
    }
  },

  // getComments: async (req, res) => {  },

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