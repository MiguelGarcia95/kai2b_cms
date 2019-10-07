const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/admin/categories');
const {isUserAuthenticated} = require('../../config/helperFunctions');

router.all('/*', isUserAuthenticated, (req, res, next) => {
  req.app.locals.layout = 'admin';
  next();
});

router.route('/categories')
  .get(categoryController.getCategories)
  .post(categoryController.createCategories);

router.route('/categories/delete/:id').delete(categoryController.deleteCategory);

module.exports = router;  
