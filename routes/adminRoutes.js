const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const {isUserAuthenticated} = require('../config/helperFunctions');

router.all('/*', isUserAuthenticated, (req, res, next) => {
  req.app.locals.layout = 'admin';
  next();
})

router.route('/').get(adminController.index);
router.route('/posts').get(adminController.getPosts);

router.route('/post/create')
  .get(adminController.createPost)
  .post(adminController.submitPost);

router.route('/posts/edit/:id')
  .get(adminController.editPost)
  .put(adminController.updatePost);

router.route('/posts/comments/:id').get(adminController.getPostComments);

router.route('/posts/comments/:id/approve').put(adminController.approvePostComment);

router.route('/posts/comments/:id/delete').delete(adminController.deletePostComment);

router.route('/posts/delete/:id').delete(adminController.deletePost);
  
router.route('/categories')
  .get(adminController.getCategories)
  .post(adminController.createCategories);

router.route('/users').get(adminController.getUsers);

router.route('/users/:id/privileges').put(adminController.updateUserPrivileges);

router.route('/users/edit/:id')
  .get(adminController.editUser)
  .post(adminController.updateUser);

router.route('/categories/delete/:id').delete(adminController.deleteCategory);


module.exports = router;  