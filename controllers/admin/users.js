const User = require('../../models/User');
const Post = require('../../models/Post');
const bcrypt = require('bcryptjs');
const fs = require('fs');

module.exports = {
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
        res.redirect('back');
      }
    } catch (error) {
      req.flash('error-message', 'Could not get user. Try Again');
      res.redirect('back');
    }
  },

  updateUser: async (req, res) => {
    const userValidation = User.validateUserUpdate(req.body);
    const user = req.user || false;
    try {
      if (userValidation.isValid) {
        const hashedPassword = await bcrypt.hash(req.body.password, 8);
        if (req.body.description && req.body.description !== user.description && req.body.password && req.body.password === req.body.confirm_password) {
          await User.findByIdAndUpdate(req.params.id, {$set: {description: req.body.description, password: hashedPassword}});
          req.flash('success-message', `User was updated`);
          res.redirect('/admin/users');
        } else if (req.body.password && req.body.password === req.body.confirm_password) {
          await User.findByIdAndUpdate(req.params.id, {$set: {password: hashedPassword}});
          req.flash('success-message', `User password was updated`);
          res.redirect('/admin/users');
        } else if (req.body.description && req.body.description !== user.description) {
          await User.findByIdAndUpdate(req.params.id, {$set: {description: req.body.description}});
          req.flash('success-message', `User description was updated`);
          res.redirect('/admin/users');
        } else if (req.body.description && req.body.description === user.description) {
          req.flash('success-message', `There is nothing to update.`);
          res.redirect('/admin/users');
        } else {
          req.flash('errors', userValidation.errors);
          res.redirect(`/admin/users/edit/${req.params.id}`);
        }
      } else {
        req.flash('errors', userValidation.errors);
        res.redirect(`/admin/users/edit/${req.params.id}`);
      }
    } catch (error) {
      req.flash('errors', userValidation.errors);
      res.redirect(`/admin/users/edit/${req.params.id}`);
    }
  },

  deleteUser: async (req, res) => {
    const user = req.user || false;

    try {
      if (String(user._id) === String(req.params.id)) {
        const posts = await Post.find({user: req.params.id});
        posts.forEach(post => {
          console.log(post);
          const p = await Post.findByIdAndDelete(req.params.id);
          fs.unlink(`./public${post.image}`, error => {
            if (error) throw error;
          });
        })
      }
      res.redirect('/admin/users');
      // res.redirect('/logout');
    } catch (error) {
      req.flash('error-message', 'User could not be deleted');
      res.redirect('/admin/users');
    }
  }
}