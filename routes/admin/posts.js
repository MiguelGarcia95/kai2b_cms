const express = require('express');
const router = express.Router();
const postController = require('../../controllers/admin/posts');

router.route('/').get(postController.index);

router.route('/posts').get(postController.getPosts);

router.route('/post/create')
  .get(postController.createPost)
  .post(postController.submitPost);

router.route('/posts/edit/:id')
  .get(postController.editPost)
  .put(postController.updatePost);

router.route('/posts/delete/:id').delete(postController.deletePost);

module.exports = router;  
