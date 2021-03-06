const express = require('express');
const router = express.Router();
const commentController = require('../../controllers/admin/comments');

router.route('/posts/comments/:id').get(commentController.getPostComments);
router.route('/posts/comments/:id/approve').put(commentController.approvePostComment);
router.route('/posts/comments/:id/delete').delete(commentController.deletePostComment);


module.exports = router;  
