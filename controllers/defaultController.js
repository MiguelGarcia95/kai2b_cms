const Post = require('../models/Post');

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
}