const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');

module.exports = {
  index: async (req, res) => {
    try {
      const posts = await Post.find().populate([{path:'category', select:'name'}, {path:'user', select:'avatar name'}]).sort({created_at: -1}).limit(9);
      const sliderPosts = posts.slice(0, 3);
      const popularPosts = posts.slice(0, 6);
      const user = req.user || false;
      res.render('default/index', {posts, user, sliderPosts, popularPosts});
    } catch (error) {
      req.flash('error-message', 'Could not get any posts. Try again.');
      res.redirect('back');
    }
  }, 

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