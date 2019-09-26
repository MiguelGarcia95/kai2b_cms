const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.all('/*', (req, res, next) => {
  req.app.locals.layout = 'admin';
  next();
})

router.route('/').get(adminController.index);
router.route('/posts').get(adminController.getPosts);

router.route('/posts/create')
  .get(adminController.createPost)
  .post(adminController.submitPost);

router.route('/posts/edit/:id')
  .get(adminController.editPost)
  .put(adminController.updatePost);

router.route('/posts/delete/:id')
  .delete(adminController.deletePost)
  
router.route('/categories')
  .get(adminController.getCategories)
  .post(adminController.createCategories);

router.route('/categories/delete/:id').delete(adminController.deleteCategory);


module.exports = router;  