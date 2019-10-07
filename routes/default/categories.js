const express = require('express');
const router = express.Router();

const categoryController = require('../../controllers/default/categories');

router.route('/categories').get(categoryController.getCategories);
router.route('/categories/:id').get(categoryController.getCategory);

module.exports = router;  