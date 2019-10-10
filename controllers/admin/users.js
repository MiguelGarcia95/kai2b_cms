const User = require('../../models/User');

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
    const user = req.user || false;
    const userValidation = User.validateUserUpdate(req.body);
    console.log(userValidation)
    try {
      if (userValidation.isValid) {
        if (req.body.description && req.body.password && req.body.password === req.body.confirm_password) {
          // update description
        }
  
        if (req.body.password && req.body.password === req.body.confirm_password) {
          // update password if updated
        }
  
        // await User.findByIdAndUpdate(req.params.id, {$set:req.body});
        // res.redirect('/admin/users');
        req.flash('errors', userValidation.errors);
        res.redirect(`/admin/users/edit/${req.params.id}`);
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
      //  make sure only user could delete their own user 


      // Delete all user posts
      // const posts = await Post.find({user: req.params.id});
      // post foreach
        // const post = await Post.findByIdAndDelete(req.params.id);
        //   fs.unlink(`./public${post.image}`, error => {
        //     if (error) throw error;
        //  });
      // req.
      // req.flash('success-message', `Post ${post.title} was deleted`);
      res.redirect('/logout');
    } catch (error) {
      req.flash('error-message', 'User could not be deleted');
    }
  }
}