const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.all('/*', (req, res, next) => {
  req.app.locals.layout = 'admin';
  next();
})

router.route('/').get(adminController.index);
router.route('/posts').get(adminController.getPosts);

router.route('/posts/add')
  .get(adminController.createPost)
  .post(adminController.submitPost);

module.exports = router;  