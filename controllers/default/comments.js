const User = require('../../models/User');
const Comment = require('../../models/Comment');

module.exports = {
  postComment: async (req, res) => {
    req.body.post = req.params.id;
    const comment = await new Comment(req.body);
    const user = await User.findById(req.user);
    try {
      if (user) {
        await comment.save();
        res.redirect('back');
        req.flash('success-message', 'Comment posted.');
      } else {
        res.redirect('back');
        req.flash('error-message', 'Please Login.');
      }
    } catch (error) {
      req.flash('error-message', 'Could not post comment.');
      res.redirect('back');
    }
  },
}