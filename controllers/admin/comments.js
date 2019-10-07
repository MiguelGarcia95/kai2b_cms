const Post = require('../../models/Post');
const Comment = require('../../models/Comment');

module.exports = {
  getPostComments: async (req, res) => {
    const user = req.user || false;
    try {
      const post = await Post.findById(req.params.id);
      const comments = await Comment.find({post: req.params.id}).populate('user', ['name', 'avatar']);
      res.render('admin/comments/index', {user, comments, post});
    } catch (error) {
      req.flash('error-message', 'Could not get post comments. Try Again');
      res.redirect('/admin/posts')
    }
  },

  approvePostComment: async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      await comment.updateOne({$set:{'approved': !comment.approved}});
      req.flash('success-message', 'Comment was approved!');
      res.redirect('back')
    } catch (error) {
      req.flash('error-message', 'Comment could not be approved');
      res.redirect('/admin/posts');
    }
  },

  deletePostComment: async (req, res) => {
    try {
      await Comment.findByIdAndDelete(req.params.id);
      req.flash('success-message', `Comment was deleted`);
      res.redirect('back')
    } catch (error) {
      req.flash('error-message', 'Comment could not be deleted');
    }
  },
}