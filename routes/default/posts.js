const express = require('express');
const router = express.Router();

const postController = require('../../controllers/default/posts');

router.route('/').get(postController.index);

router.route('/posts').get(postController.getPosts);
router.route('/posts/:id').get(postController.getPost)

module.exports = router;  