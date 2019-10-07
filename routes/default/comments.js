const express = require('express');
const router = express.Router();

const commentController = require('../../controllers/default/comments');

router.route('/posts/:id').post(commentController.postComment);

module.exports = router;  